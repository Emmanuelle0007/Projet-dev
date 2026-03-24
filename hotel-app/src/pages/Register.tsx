import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-900 via-gray-900 to-black">
      
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-white/20">
        
        <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
            Inscription
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg mb-4 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-3 rounded-lg mb-4 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300">
          S'inscrire
        </button>

        <div className="mt-4 text-sm text-center">
          <Link to="/" className="text-blue-400 hover:underline">
            Retour à la connexion
          </Link>
        </div>

      </div>
    </div>
  );
}