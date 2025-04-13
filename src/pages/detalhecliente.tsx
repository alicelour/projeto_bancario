// src/pages/DetalheCliente.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Cliente, Conta, Agencia } from "../types/interfaces";
import { getCSVData } from "../services/api";
import { parseCSV } from "../utils/csvparser";
import { formatarCpfCnpj, normalizarCliente, normalizarConta, normalizarAgencia } from "../utils/normalizador";
import "./detalhecliente.css";


const DetalheCliente = () => {
  const { id } = useParams<{ id: string }>();

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencia, setAgencia] = useState<Agencia | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      const { clientesCSV, contasCSV, agenciasCSV } = await getCSVData();

      const todosClientes = parseCSV<Cliente>(clientesCSV).map(normalizarCliente);
      const clienteEncontrado = todosClientes.find((c) => c.id === id);
      if (!clienteEncontrado) return;

      setCliente(clienteEncontrado);

      const todasContas = parseCSV<Conta>(contasCSV).map(normalizarConta);
      const contasDoCliente = todasContas.filter(
        (conta) => conta.cpfCnpjCliente === clienteEncontrado.cpfCnpj
      );
      setContas(contasDoCliente);

      const todasAgencias = parseCSV<Agencia>(agenciasCSV).map(normalizarAgencia);
      const agenciaDoCliente = todasAgencias.find(
        (ag) => ag.codigo === clienteEncontrado.codigoAgencia
      );
      setAgencia(agenciaDoCliente || null);
    };

    carregarDados();
  }, [id]);

  if (!cliente) return <div className="p-4">Carregando cliente...</div>;

  return (
        <div className="detalhe-container">
            <div className="voltar-topo">
                <Link to="/">
                    <img src="/public/voltar.png" alt="Voltar" className="seta-voltar" />
                </Link>
            </div>
            <h1 className="titulo-cliente">{cliente.nomeSocial || cliente.nome} </h1>
            <p className="cpf-info"><strong>CPF/CNPJ:</strong> {formatarCpfCnpj(cliente.cpfCnpj)}</p>

            <div className="infos-grid">
                <div className="info-item"><strong>Data de Nascimento:</strong><br /> {cliente.dataNascimento.toLocaleDateString()}</div>
                <div className="info-item"><strong>Email:</strong><br /> {cliente.email}</div>
                <div className="info-item"><strong>Endereço:</strong><br /> {cliente.endereco}</div>
                <div className="info-item"><strong>Renda Anual:</strong><br /> R$ {cliente.rendaAnual.toLocaleString()}</div>
                <div className="info-item"><strong>Patrimônio:</strong><br /> R$ {cliente.patrimonio.toLocaleString()}</div>
                <div className="info-item"><strong>Estado Civil:</strong><br /> {cliente.estadoCivil}</div>
            </div>

            <div className="layout-horizontal">
                <div className="coluna">
                    <h2 className="card-titulo">Contas Bancárias</h2>
                    {contas.length > 0 ? (
                        contas.map((conta) => (
                        <div key={conta.id} className="info-bloco">
                            <p><strong>Tipo:</strong> {conta.tipo}</p>
                            <p><strong>Saldo:</strong> R$ {conta.saldo.toLocaleString()}</p>
                            <p><strong>Limite de Crédito:</strong> R$ {conta.limiteCredito.toLocaleString()}</p>
                            <p><strong>Crédito Disponível:</strong> R$ {conta.creditoDisponivel.toLocaleString()}</p>
                        </div>
                        ))
                    ) : (
                        <p className="mensagem-vazia">Nenhuma conta encontrada.</p>
                    )}
                </div>

                <div className="coluna">
                    <h2 className="card-titulo">Agência</h2>
                    {agencia ? (
                        <div className="grid-info-agencia">
                        <p><strong>Nome:</strong> {agencia.nome}</p>
                        <p><strong>Código:</strong> {agencia.codigo}</p>
                        <p><strong>Endereço:</strong> {agencia.endereco}</p>
                        </div>
                    ) : (
                        <p className="mensagem-vazia">Agência não encontrada.</p>
                    )}
                </div>

            </div>
            
        </div>

  );
};

export default DetalheCliente;
