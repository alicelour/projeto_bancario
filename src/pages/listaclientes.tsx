import { useEffect, useState } from "react";
import { Cliente } from "../types/interfaces";
import { getCSVData } from "../services/api";
import { parseCSV } from "../utils/csvparser";
import { Link } from "react-router-dom";
import { formatarCpfCnpj, normalize } from "../utils/normalizador"; // Assumindo que você já tem a função de formatação
import "./listaclientes.css";

const ListaClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtro, setFiltro] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const itensPorPagina = 10;

  useEffect(() => {
    const carregarDados = async () => {
      const { clientesCSV } = await getCSVData();
      const dados: any[] = parseCSV<Cliente>(clientesCSV);

      const clientesFormatados = dados.map((item) => ({
        ...item,
        dataNascimento: new Date(item.dataNascimento),
        rendaAnual: parseFloat(item.rendaAnual),
        patrimonio: parseFloat(item.patrimonio),
        codigoAgencia: parseInt(item.codigoAgencia),
      }));

      setClientes(clientesFormatados);
    };

    carregarDados();
  }, []);


  const clientesFiltrados = clientes.filter((cliente) => {
    const filtroNormalizado = normalize(filtro);
    const nomeExibido = normalize(cliente.nomeSocial || cliente.nome);
  
    return (
      nomeExibido.startsWith(filtroNormalizado) ||
      cliente.cpfCnpj.includes(filtro)
    );
  });
  
  

  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const clientesPaginados = clientesFiltrados.slice(inicio, inicio + itensPorPagina);

  return (
    <div className="p-4 max-w-4xl mx-auto">
    <header className="cabecalho">
      <h1 className="titulo-centralizado">Sistema de Consulta de Clientes</h1>
      <p className="subtitulo">Acesse os dados bancários dos clientes cadastrados</p>
    </header>

    {/* Barra de Pesquisa */}
    <div className="barra-pesquisa">
      <div className="campo-pesquisa">
        <img src="/public/lupa.png" alt="Ícone de lupa" className="icone-lupa" />
        <input
          type="text"
          placeholder="Buscar por nome ou CPF/CNPJ"
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setPaginaAtual(1);
          }}
        />
      </div>
    </div>

    {/* Lista de Clientes */}
    <ul className="space-y-4">
      {clientesPaginados.map((cliente) => (
        <Link to={`/cliente/${cliente.id}`} key={cliente.id} className="cliente-link">
          <li className="cartao">
            <h2 className="font-semibold">{cliente.nomeSocial || cliente.nome}</h2>
            <p>CPF/CNPJ: {formatarCpfCnpj(cliente.cpfCnpj)}</p>
            <p>Email: {cliente.email}</p>
          </li>
        </Link>
      ))}
    </ul>

    {/* Paginação */}
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: totalPaginas }).map((_, index) => (
        <button
          key={index}
          onClick={() => setPaginaAtual(index + 1)}
          className={`px-3 py-1 rounded ${
            paginaAtual === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </div>

  );
};

export default ListaClientes;
