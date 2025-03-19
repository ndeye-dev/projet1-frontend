// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie'; // Importez js-cookie

// export default function Connexion() {
//   const router = useRouter();

//   // États du formulaire
//   const [formData, setFormData] = useState({
//     email: '',
//     motDePasse: '',
//   });

//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fonction pour mettre à jour les champs du formulaire
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Fonction de soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       const response = await fetch('https://backend-store-loy5.onrender.com/api/utilisateurs/connexion-utilisateur', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Stocker le token dans le localStorage
//         localStorage.setItem('token', data.token);

//         // Stocker le token dans le cookie
//         Cookies.set('token', data.token, { expires: 7, path: '/' }); 

//         setMessage('Connexion réussie !');
//         setTimeout(() => router.push('/produits'), 1000); // Redirection vers /produits
//       } else {
//         setMessage(data.message || 'Échec de la connexion.');
//       }
//     } catch (error) {
//       console.error('Erreur:', error);
//       setMessage('Une erreur s\'est produite. Veuillez réessayer.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
     
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>

//         {message && <p className="text-center text-green-500">{message}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Champ Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           {/* Champ Mot de passe */}
//           <div>
//             <label htmlFor="motDePasse" className="block text-sm font-medium">Mot de passe</label>
//             <input
//               type="password"
//               id="motDePasse"
//               name="motDePasse"
//               value={formData.motDePasse}
//               onChange={handleChange}
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           {/* Bouton de connexion */}
//           <button
//             type="submit"
//             className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 disabled:opacity-50"
//             disabled={loading}
//           >
//             {loading ? 'Connexion en cours...' : 'Se connecter'}
//           </button>
//         </form>

//         {/* Lien vers l'inscription */}
//         <p className="mt-4 text-center text-sm">
//           Pas encore de compte ? <a href="/auth/inscription" className="text-blue-500 hover:underline">Inscrivez-vous</a>
//         </p>
//       </div>
//     </div>
//   );
// }
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Connexion() {
  const router = useRouter();

  // États du formulaire
  const [formData, setFormData] = useState({
    email: '',
    motDePasse: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
  
    if (!formData.email || !formData.motDePasse) {
      setMessage('Veuillez entrer un email et un mot de passe.');
      setLoading(false);
      return;
    }
  
    console.log('Données envoyées:', formData);
  
    try {
      const response = await fetch('http://localhost:5000/api/utilisateurs/connexion-utilisateur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const data = await response.json();
        console.log('Réponse API:', data); 
        setMessage(data.message || 'Échec de la connexion.');
        setLoading(false);
        return;
      }
  
      const data = await response.json();
  
      if (formData.email === 'admin@gmail.com') {
        Cookies.set('token', data.token, { expires: 7, path: '/' });
        localStorage.setItem('token', data.token);
        setMessage('Connexion admin réussie !');
        setTimeout(() => router.push('/adminn'), 1000); // Redirection vers la page admin
      } else {
        Cookies.set('token', data.token, { expires: 7, path: '/' });
        localStorage.setItem('token', data.token);
        setMessage('Connexion réussie !');
        setTimeout(() => router.push('/produits'), 1000); // Redirection vers les produits
      }
      
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setMessage('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>

        {message && <p className="text-center text-green-500">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Bouton de connexion */}
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Pas encore de compte ? <a href="/auth/inscription" className="text-blue-500 hover:underline">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );
}
