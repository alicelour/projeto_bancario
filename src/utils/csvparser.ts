import Papa from 'papaparse'; //converter arquivos em objetos

//le a primeira linha do CSV para criar as chaves e cada linha é convertida em objetos

export const parseCSV = <T>(csv: string): T[] => {
  const result = Papa.parse<T>(csv, {
    header: true,
    skipEmptyLines: true, //ignora linhas em branco
  });

  return result.data;
};
