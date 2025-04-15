import { useEffect, useState } from "react";
import { Cliente } from "../types/interfaces";
import { getCSVData } from "../services/api";
import { parseCSV } from "../utils/csvparser";
import { Link } from "react-router-dom";
import { formatarCpfCnpj, normalize, normalizarCliente } from "../utils/normalizador"; 
import "./listaclientes.css";

const ListaClientes = () => {

  //definiçoes vazias e a pagina definida como a primeira
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtro, setFiltro] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);

  //definindo a quantidade de clientes por pagina
  const itensPorPagina = 10;


  useEffect(() => {

    //declarauma função assincrona (espera por operações demoradas sem travar o resto do codigo)
    const carregarDados = async () => {

      //puxa os dados do cliente do csv
      const { clientesCSV } = await getCSVData();
      //transforma em um array de objetos
      const dados: any[] = parseCSV<Cliente>(clientesCSV);
      //normaliza os dados
      const clientesFormatados = dados.map(normalizarCliente);
      //atualiza o estado
      setClientes(clientesFormatados);
      
    };

    carregarDados();
  }, []);


  const clientesFiltrados = clientes.filter((cliente) => {
    //normalizando o filtro de busca da pagina
    const filtroNormalizado = normalize(filtro);
    //comparando com o nome
    const nomeExibido = normalize(cliente.nomeSocial || cliente.nome);
  
    return (
      //pegando pelo inicio da palavra
      nomeExibido.startsWith(filtroNormalizado) ||
      //opçao de procurar e=pelo cpf ou cnpj
      cliente.cpfCnpj.includes(filtro)
    );
  });
  
  
  //calcula quantas paginas vao ser mostradas de acordo com a quantidade de clientes (quantidade de clientes pela quantidade de clientes por pagina)
  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);
  //indice inicial da lista que sera mostrada
  const inicio = (paginaAtual - 1) * itensPorPagina;

  /*recorta apenas os clientes daquela pagina 
  se o inicio for 0 e itens por pagina 10, entao so mostra o cliente de 0 a 9
  se o inicio for 10 e itens 10, entao mostra do cliente 10 ao 19*/
  const clientesPaginados = clientesFiltrados.slice(inicio, inicio + itensPorPagina);

  return (

    //conteiner geral
    <div className="conteiner">
    {/*Parte  */}
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
    <ul className="Cliente-card">
      
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
    <div className="paginacao">
      {Array.from({ length: totalPaginas }).map((_, index) => (
        <button
          key={index}
          onClick={() => setPaginaAtual(index + 1)}
          className="setpagina">
          {index + 1}
        </button>
      ))}
    </div>
  </div>

  );
};

export default ListaClientes;
