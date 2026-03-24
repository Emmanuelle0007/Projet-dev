import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="flex justify-between p-5 bg-white shadow">
        <h1 className="text-xl font-bold">HotelApp 🏨</h1>

        <div>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold mb-4">
          Réservez votre hôtel facilement
        </h1>

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Réserver maintenant
        </button>
      </div>

    </div>
  );
}