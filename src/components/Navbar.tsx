import React from 'react';
import { Link } from 'react-router-dom';
import { Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-indigo-600" />
            <Link to="/" className="ml-2 text-xl font-bold text-gray-800">
              Comunidade Hino
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-600">Olá, {user.username}</span>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Painel Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Registrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}