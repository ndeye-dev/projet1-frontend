'use client';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav';

export default function Profil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les données de l'utilisateur
    const fetchUserProfile = async () => {
      // Récupérer le token du localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Token non trouvé, vous devez être connecté.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://backendclothstore.onrender.com/api/utilisateurs/profil', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Ajouter le token dans les headers
          },
        });
        
        if (!response.ok) {
          throw new Error('Impossible de récupérer le profil');
        }
        
        const data = await response.json();
        setUser(data);  // Stocker les informations de l'utilisateur
      } catch (err) {
        setError(err.message); // Gérer les erreurs
      } finally {
        setLoading(false);  // Fin du chargement
      }
    };

    fetchUserProfile();
  }, []); // Ne s'exécute qu'une seule fois au chargement du composant

  // Affichage en fonction de l'état
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-red-600">{`Erreur: ${error}`}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Aucun utilisateur trouvé.</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center py-10">
      <div><Nav /> </div>
      <div className="bg-white rounded-2xl shadow-xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-8 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
        <h1 className="text-3xl font-semibold  text-gray-700 mb-6">Profil de {user.nom} {user.prenom}</h1>
        
        <div className="text-lg text-gray-800 mb-4">
          <p><span className="font-semibold text-gray-700">Email :</span> {user.email}</p>
        </div>

        {/* Affiche d'autres données de l'utilisateur si nécessaire */}
        {/* Exemple : */}
        {/* <p>Autre info : {user.autreInfo}</p> */}

        <div className="mt-6">
          <button className="w-full bg-white border-2 border-[#5E5E5E] text-[#5E5E5E] py-3 px-6 rounded-xl shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5E5E5E] focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105">
            Modifier le profil
          </button>
        </div>
      </div>
    </div>
  );
}
