import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/sidebar";
import Login from "./page/Login";
import Home from "./page/Home";
import Usuarios from "./page/Usuarios";
import Reportes from "./page/Reportes";
import Productos from "./page/Productos";
import Examenes from "./page/Examenes";
import Estudiantes from "./page/Estudiantes";
import Pago from "./page/Pago";
import ProtectedRoute from "./Auth/ProtectedRoute";

import "./App.css";
import { useAuth } from "./Auth/AuthContext";
import Error404 from "./page/Error";

function App() {
  const { isAuth } = useAuth();
  return (
    <BrowserRouter>
      {isAuth && (
        <>
          <div className="flex flex-col h-screen">
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 p-6 transition-all duration-300 lg:w-[77%] overflow-auto">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
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
                </Routes>
              </main>
            </div>
          </div>
        </>
      )}
      {!isAuth && (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
