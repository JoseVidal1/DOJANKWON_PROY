import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex justify-end items-center shadow-sm">
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          Iniciar sesión
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
