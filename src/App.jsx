import Sidebar from "./Components/sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Auth/ProtectedRoute";

//import Login from './page/Login';
import Estudiantes from "./page/Estudiantes";
import Examenes from "./page/Examenes";
import Home from "./page/Home";
import Login from "./page/Login";
import Pago from "./page/Pago";
import Productos from "./page/Productos";
import Reportes from "./page/Reportes";
import Usuarios from "./page/Usuarios";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 transition-all duration-300 lg:w-[77%]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute>
                  <Usuarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reportes"
              element={
                <ProtectedRoute>
                  <Reportes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/productos"
              element={
                <ProtectedRoute>
                  <Productos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/examenes"
              element={
                <ProtectedRoute>
                  <Examenes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Estudiantes"
              element={
                <ProtectedRoute>
                  <Estudiantes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Pago"
              element={
                <ProtectedRoute>
                  <Pago />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={null} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default App;
