
// função para fazer a requisicao e obter o conteudo CSV de uma URL
const fetchCSV = async (url: string): Promise<string> => {
    // realiza a requisicao HTTP para a URL fornecida e aguarda a resposta
    const response = await fetch(url);
    // Retorna o conteudo da resposta como uma string
    return await response.text();
  };
  
  // funcao para obter os dados das tres planilhas em formato CSV
  export const getCSVData = async () => {

    // define as URLs das tres abas da planilha, com links para obter os dados em formato CSV
    const urls = {
      clientes: 'https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes',
      contas: 'https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas',
      agencias: 'https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias',
    };
  
    // faz as requisicoes simultaneas para todas as URLs definidas acima
    const [clientesCSV, contasCSV, agenciasCSV] = await Promise.all([
      fetchCSV(urls.clientes),
      fetchCSV(urls.contas),
      fetchCSV(urls.agencias),
    ]);
  
    return { clientesCSV, contasCSV, agenciasCSV };
  };
  
  