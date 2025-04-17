import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListaClientes from "./pages/listaclientes";
import DetalheCliente from "./pages/detalhecliente";

// Rotas definidas na página
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Adicione o basename para GitHub Pages funcionar */}
    <BrowserRouter basename="/projeto_bancario">
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<ListaClientes />} />

        {/* Página de detalhes do cliente */}
        <Route path="/cliente/:id" element={<DetalheCliente />} />

        {/* Rota genérica: redireciona para a principal */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
