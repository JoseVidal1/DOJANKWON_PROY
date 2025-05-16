import "./App.css";
import Sidebar from "./Components/sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./page/Login";
import Home from "./page/Home";
import Usuarios from "./page/Usuarios";
import Reportes from "./page/Reportes";
import Productos from "./page/Productos";
import Examenes from "./page/Examenes";
import Estudiantes from "./page/Estudiantes";
import Pago from "./page/Pago";
import ProtectedRoute from "./Auth/ProtectedRoute";

const isAuth = true;

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 transition-all duration-300 lg:w-[77%]">
        <BrowserRouter>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Usuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reportes"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Reportes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Productos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/examenes"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Examenes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Estudiantes"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Estudiantes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Pago"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Pago />
              </ProtectedRoute>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={null} />
        </BrowserRouter>
      </main>
    </div>
  );
}
export default App;
