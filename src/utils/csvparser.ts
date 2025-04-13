import Papa from 'papaparse';

export const parseCSV = <T>(csv: string): T[] => {
  const result = Papa.parse<T>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data;
};
