import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-gray-900 to-black">
      
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-white/20">
        
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          🔐 Connexion
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg mb-4 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-3 rounded-lg mb-4 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Se connecter
        </button>

        <div className="flex justify-between mt-4 text-sm">
          <Link to="/register" className="text-blue-400 hover:underline">
            Créer un compte
          </Link>

          <Link to="/forgot-password" className="text-red-400 hover:underline">
            Mot de passe oublié
          </Link>
        </div>

      </div>
    </div>
  );
}