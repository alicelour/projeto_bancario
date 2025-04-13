import { Cliente, Conta, Agencia } from "../types/interfaces";

export function normalizarCliente(item: any): Cliente {
  return {
    ...item,
    dataNascimento: new Date(item.dataNascimento),
    rendaAnual: parseFloat(item.rendaAnual),
    patrimonio: parseFloat(item.patrimonio),
    codigoAgencia: parseInt(item.codigoAgencia),
  };
}

export function normalizarConta(item: any): Conta {
  return {
    ...item,
    saldo: parseFloat(item.saldo),
    limiteCredito: parseFloat(item.limiteCredito),
    creditoDisponivel: parseFloat(item.creditoDisponivel),
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
  
  