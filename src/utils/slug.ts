export const criarSlug = (nome: string) =>
    nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/\s+/g, "-") // espaços viram hífen
        .replace(/[^a-z0-9-]/g, ""); // remove caracteres especiais