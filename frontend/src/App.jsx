import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Agendamento } from "./pages/Agendamento";

function App() {
  return (
    <>
      {/* Container principal de rotas */}
      <BrowserRouter>
        {/* Agrupa todas as rotas */}
        <Routes> 
          {/* Rota da página inicial (/) */}
          <Route index element={<Home />} /> 
          
          {/* Rota para gerenciamento de pacientes - agora usando Agendamento */}
          <Route path="/agenda" element={<Agendamento />} />
          
          {/* Rota curinga para páginas não encontradas - DEVE SER A ÚLTIMA */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;