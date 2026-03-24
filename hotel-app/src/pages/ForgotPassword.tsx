import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-900 via-gray-900 to-black">
      
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 border border-white/20">
        
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          🔁 Réinitialiser
        </h2>

        <input
          type="email"
          placeholder="Votre email"
          className="w-full p-3 rounded-lg mb-4 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300">
          Envoyer
        </button>

        <div className="mt-4 text-sm text-center">
          <Link to="/" className="text-blue-400 hover:underline">
            Retour
          </Link>
        </div>

      </div>
    </div>
  );
}