'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Inscription() {
  const router = useRouter();

  // États du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fonction pour mettre à jour les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://backend-store-loy5.onrender.com/api/utilisateurs/inscription-utilisateur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Stocker le token
        setMessage('Inscription réussie ! Redirection...');
        setTimeout(() => router.push('/auth/connexion'), 1000); // Redirection
      } else {
        setMessage(data.message || 'Échec de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>

        {message && <p className="text-center text-red-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ Nom */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Champ Prénom */}
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium">Prénom</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Champ Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label htmlFor="motDePasse" className="block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              id="motDePasse"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Bouton d'inscription */}
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>
        </form>

        {/* Lien vers la connexion */}
        <p className="mt-4 text-center text-sm">
          Déjà un compte ? <a href="/auth/connexion" className="text-blue-500 hover:underline">Connectez-vous</a>
        </p>
      </div>
    </div>
  );
}
