//imports necessáros
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";  // rotas
import { Cliente, Conta, Agencia } from "../types/interfaces";  //modelo definido
import { getCSVData } from "../services/api";  //import da api (pega o csv da url)
import { parseCSV } from "../utils/csvparser"; // arquivos em objetos
import { formatarCpfCnpj, normalizarCliente, normalizarConta, normalizarAgencia } from "../utils/normalizador";
import "./detalhecliente.css";


const DetalheCliente = () => {
    const { id } = useParams<{ id: string }>(); //identificar o cliente da pagina

    //definindo tres estados que inicalmente estao vazios
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [contas, setContas] = useState<Conta[]>([]);
    const [agencia, setAgencia] = useState<Agencia | null>(null);

    //hook do react que executa o que ta definido quando uma variavel muda, no caso o ID
    useEffect(() => {
        const carregarDados = async () => {
            const { clientesCSV, contasCSV, agenciasCSV } = await getCSVData();
          
            // Carregar todos os clientes e normalizar
            const todosClientes = parseCSV<Cliente>(clientesCSV).map(normalizarCliente);
            const clienteEncontrado = todosClientes.find((c) => c.id === id);
            if (!clienteEncontrado) return;
          
            setCliente(clienteEncontrado);
            
            // Carregar todas as agências e procurar a do cliente
            const todasAgencias = parseCSV<Agencia>(agenciasCSV).map(normalizarAgencia);
            const agenciaDoCliente = todasAgencias.find(
              (ag) => ag.codigo === clienteEncontrado.codigoAgencia
            );
            
            // Verificar se foi encontrada uma agência e atualize o estado 
            setAgencia(agenciaDoCliente || null);

            // Carregar todas as contas e filtrar as do cliente
            const todasContas = parseCSV<Conta>(contasCSV).map(normalizarConta);
            const contasDoCliente = todasContas.filter(
              (conta) => conta.cpfCnpjCliente === clienteEncontrado.cpfCnpj
            );
            setContas(contasDoCliente);
          
          };
          
        carregarDados();
    }, [id]);

    if (!cliente) return <div className="p-4">Carregando cliente...</div>;

    //retorna a tela
    return (

        //div geral
        <div className="detalhe-container">

            {/*Nome do Cliente 
            lembrando de dar prioridade para o nome socia caso tiver*/}
            <h1 className="titulo-cliente">
                <Link to="/" className="link-voltar">
                    <img src="/public/voltar.svg" alt="Voltar" className="seta-voltar-inline" />
                </Link>
                {cliente.nomeSocial || cliente.nome} 
            </h1>
            
            {/*cpf*/}
            <p className="cpf-info"><strong>CPF/CNPJ:</strong> {formatarCpfCnpj(cliente.cpfCnpj)}</p>
            
            {/*area informações abaixo do cpf */}
            <div className="infos-grid">
                <div className="info-item"><strong>Data de Nascimento:</strong><br /> {cliente.dataNascimento.toLocaleDateString()}</div>
                <div className="info-item"><strong>Email:</strong><br /> {cliente.email}</div>
                <div className="info-item"><strong>Endereço:</strong><br /> {cliente.endereco}</div>
                <div className="info-item"><strong>Renda Anual:</strong><br /> R$ {cliente.rendaAnual.toLocaleString()}</div>
                <div className="info-item"><strong>Patrimônio:</strong><br /> R$ {cliente.patrimonio.toLocaleString()}</div>
                <div className="info-item"><strong>Estado Civil:</strong><br /> {cliente.estadoCivil}</div>
            </div>

            {/*area das contas */}
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

                {/*are da agencia */}
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
