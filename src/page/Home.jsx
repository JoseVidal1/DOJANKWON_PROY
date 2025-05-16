import { useAuth } from "../Auth/AuthContext";

function Home() {
  const { isAuth, logout } = useAuth();
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Inicio</h1>
        <p className="text-gray-600">Bienvenido al panel de administración.</p>
      </div>

      <div>
        {isAuth && (
          <button
            onClick={logout}
            style={{
              border: "none",
              marginLeft: "20px",
              fontSize: "18px",
              fontWeight: 600,
              color: "#000",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
}

export default Home;
