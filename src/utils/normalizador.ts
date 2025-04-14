import { Cliente, Conta, Agencia } from "../types/interfaces";


const parseValor = (valor: string | number): number => {
  if (typeof valor === "number") return valor;

  return parseFloat(
    valor
    .replace("R$", "")      // Remove o R$
    .replace(/\./g, "")     // Remove os pontos (milhares)
    .replace(",", ".")      // Troca a vírgula decimal por ponto
    .trim()                 // Remove espaços em branco
  );
};

export function normalizarCliente(item: any): Cliente {
  return {
    ...item,
    dataNascimento: new Date(item.dataNascimento),
    rendaAnual: parseValor(item.rendaAnual),
    patrimonio: parseValor(item.patrimonio),
    codigoAgencia: parseInt(item.codigoAgencia),
  };
}

export function normalizarConta(item: any): Conta {
  return {
    ...item,
    saldo: parseValor(item.saldo),
    limiteCredito: parseValor(item.limiteCredito),
    creditoDisponivel: parseValor(item.creditoDisponivel),
  };
}

export function normalizarAgencia(item: any): Agencia {
  return {
    ...item,
    codigo: parseInt(item.codigo),
  };
}

export function formatarCpfCnpj(valor: string): string {
    const numeros = valor.replace(/\D/g, "");
  
    if (numeros.length === 11) {
      // CPF: 000.000.000-00
      return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (numeros.length === 14) {
      // CNPJ: 00.000.000/0000-00
      return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
  
    // Se não for CPF nem CNPJ, retorna como está
    return valor;
  }

  export function normalize(str: string): string {
    return str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() || "";
  }
  
  