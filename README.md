# 💼 Sistema de Visualização de Clientes

Este é um projeto desenvolvido com **React + TypeScript + Vite** que exibe dados de clientes, contas bancárias e agências a partir de arquivos CSV hospedados no Google Sheets.

## 🚀 Tecnologias

- [React](https://reactjs.org/)

- [TypeScript](https://www.typescriptlang.org/)

- [Vite](https://vitejs.dev/)

- [React Router](https://reactrouter.com/) (para navegação)

- Google Sheets como base de dados em tempo real

## 📁 Estrutura do Projeto 

src/ 

├── pages/ # Páginas principais (Lista de Clientes, Detalhes do Cliente) 

├── services/ # Funções para carregar dados dos CSVs 

├── types/ # Interfaces TypeScript (Cliente, Conta, Agência) 

├── utils/ # Funções auxiliares como o parser de CSV e o normalizador

├── App.tsx 

└── main.tsx 

## 📊 Funcionalidades

- 🔍 Busca por nome ou CPF/CNPJ

- 📄 Exibição de informações detalhadas por cliente

- 🧮 Relação com contas bancárias e agência correspondente

- 📑 Paginação dos resultados

- 📥 Leitura de dados a partir de planilhas do Google (em formato CSV)

## 🔧 Como rodar o projeto localmente

**1. Clone o repositório:**

```bash
git clone https://github.com/alicelour/projeto_bancario.git
cd projeto_bancario

**2. Instale as dependências:**

npm install
# ou
yarn

**3. Inicie o servidor de desenvolvimento:**

npm run dev
# ou
yarn dev

**4. Abra no navegador:**

 Acesse http://localhost:5173

##  Configurações
Certifique-se de que os links dos CSVs estejam atualizados no arquivo:

src/services/api.ts

