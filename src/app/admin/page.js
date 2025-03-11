'use client';
import React, { useState } from 'react';

export default function AjouterProduit() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [categorie, setCategorie] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState({ rate: '', count: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduit = {
      title: titre,
      description: description,
      price: parseFloat(prix),
      category: categorie,
      image: image,
      rating: {
        rate: parseFloat(rating.rate),
        count: parseInt(rating.count),
      },
    };

    if (isNaN(newProduit.price) || isNaN(newProduit.rating.rate) || isNaN(newProduit.rating.count)) {
      alert("Les données sont incorrectes. Veuillez vérifier les champs.");
      return;
    }

    try {
      const response = await fetch('https://backend-store-loy5.onrender.com/api/produits/ajouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduit),
      });

      if (response.ok) {
        alert('Produit ajouté avec succès!');
        setTitre('');
        setDescription('');
        setPrix('');
        setCategorie('');
        setImage('');
        setRating({ rate: '', count: '' });
      } else {
        alert('Erreur lors de l\'ajout du produit.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Ajouter un Produit</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Titre</label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Prix (€)</label>
            <input
              type="number"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Catégorie</label>
            <input
              type="text"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">URL de l&apos;image</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Note (Rate)</label>
              <input
                type="number"
                value={rating.rate}
                onChange={(e) => setRating({ ...rating, rate: e.target.value })}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
                max="5"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Nombre d&apos;avis (Count)</label>
              <input
                type="number"
                value={rating.count}
                onChange={(e) => setRating({ ...rating, count: e.target.value })}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium text-lg hover:bg-blue-700 transition duration-200"
          >
            Ajouter le produit
          </button>
        </form>
      </div>
    </div>
  );
}
