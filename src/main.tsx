
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ListaClientes from "./pages/listaclientes";
import DetalheCliente from "./pages/detalhecliente";

//rotas definidas na pagina

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<ListaClientes />} />
        
        {/* Página de detalhes do cliente */}
        <Route path="/cliente/:id" element={<DetalheCliente />} />
        
        {/* Rota genérica */}
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
