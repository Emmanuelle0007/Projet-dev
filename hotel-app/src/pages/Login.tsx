import { useState } from "react";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3C3B58]">
      {/* CONTAINER PRINCIPAL */}
      <div className="w-[760px] h-[420px] bg-white rounded-[25px] overflow-hidden flex shadow-xl">
        
        {/* LEFT SIDE (formulaire) */}
        <div className="w-1/2 flex items-center justify-center bg-[#fef8f5]">
          {/* CARD FORM */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-[280px]">
            
            <h3 className="text-orange-400 font-semibold mb-3 text-sm">
              Votre logo ici
            </h3>

            <p className="text-gray-400 text-xs mb-1">
              {isRegister ? "Créer un compte" : "Bienvenue !!!"}
            </p>

            <h2 className="text-xl font-bold mb-5">
              {isRegister ? "Inscription" : "Connexion"}
            </h2>

            <form>
              {isRegister && (
                <div className="mb-3">
                  <label className="text-xs text-gray-600">Nom complet</label>
                  <input
                    type="text"
                    className="w-full p-2 mt-1 bg-[#F3EAEA] rounded-lg outline-none text-sm"
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="text-xs text-gray-600">Email</label>
                <input
                  type="email"
                  placeholder="test@gmail.com"
                  className="w-full p-2 mt-1 bg-[#F3EAEA] rounded-lg outline-none text-sm"
                />
              </div>

              <div className="mb-1">
                <div className="flex justify-between text-xs text-gray-600">
                  <label>Password</label>
                  {!isRegister && (
                    <span className="text-gray-400 cursor-pointer">
                      Mot de passe oublié
                    </span>
                  )}
                </div>

                <input
                  type="password"
                  placeholder="********"
                  className="w-full p-2 mt-1 bg-[#F3EAEA] rounded-lg outline-none text-sm"
                />
              </div>

              {isRegister && (
                <div className="mt-3">
                  <label className="text-xs text-gray-600">
                    Confirmer mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 mt-1 bg-[#F3EAEA] rounded-lg outline-none text-sm"
                  />
                </div>
              )}

              {/* BOUTON CENTRÉ LONGUEUR MOYENNE */}
              <button
                type="submit"
                className="w-[140px] mx-auto mt-3 bg-orange-400 hover:bg-orange-500 text-white py-1 rounded-full text-xs transition block"
              >
                {isRegister ? "S’INSCRIRE" : "SE CONNECTER"}
              </button>
            </form>

            <p className="text-center text-gray-400 text-xs mt-4">
              {isRegister ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
              <span
                onClick={() => setIsRegister(!isRegister)}
                className="text-orange-400 cursor-pointer"
              >
                {isRegister ? "Connexion" : "S’inscrire"}
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (image) */}
        <div className="w-1/2">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}