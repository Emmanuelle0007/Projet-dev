import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    console.log("Connexion avec :", email, password);
  };

  return (
    <div className="min-h-screen flex bg-[#4B4866]">
      {/* LEFT SIDE */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100 rounded-r-[40px]">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">
          <h3 className="text-orange-400 font-semibold mb-2">
            Votre logo ici
          </h3>

          <p className="text-gray-400 text-sm mb-1">Bienvenue !!!</p>

          <h2 className="text-3xl font-bold mb-6">Connexion</h2>

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="test@gmail.com"
                className="w-full p-3 mt-1 bg-gray-100 rounded-lg outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600">
                <label>Password</label>
                <Link to="/reset-password" className="text-gray-400">
                  Mot de passe oublié
                </Link>
              </div>
              <input
                type="password"
                placeholder="********"
                className="w-full p-3 mt-1 bg-gray-100 rounded-lg outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-full transition"
            >
              SE CONNECTER
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Pas encore de compte ?{" "}
            <Link to="/register" className="text-orange-400 font-medium">
              S’inscrire
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE avec photo */}
      <div className="w-1/2">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="photo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}