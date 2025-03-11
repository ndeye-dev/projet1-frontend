"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PaiementPage() {
  const [clientInfo, setClientInfo] = useState(null);
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("clientInfo"));
    const panierStocke = JSON.parse(localStorage.getItem("panier")) || [];

    setClientInfo(info);
    setPanier(panierStocke);
  }, []);

  if (!clientInfo) {
    return <p className="p-8 text-red-500">Erreur : Aucune information client trouvée.</p>;
  }

  const total = panier.reduce((acc, produit) => acc + produit.price * produit.quantite, 0);

  const updateQuantite = (id, action) => {
    const updatedPanier = panier.map((produit) => {
      if (produit.id === id) {
        if (action === "plus") {
          produit.quantite += 1;
        } else if (action === "moins" && produit.quantite > 1) {
          produit.quantite -= 1;
        }
      }
      return produit;
    });
    setPanier(updatedPanier);
    localStorage.setItem("panier", JSON.stringify(updatedPanier));
  };

  const removeProduit = (id) => {
    const updatedPanier = panier.filter((produit) => produit.id !== id);
    setPanier(updatedPanier);
    localStorage.setItem("panier", JSON.stringify(updatedPanier));
  };

  return (
    <main className="p-8 max-w-screen-xl mx-auto space-y-8">
      <a href="/paniers" className="text-blue-500 font-semibold hover:underline">← Retour au panier</a>
      <h1 className="text-3xl font-bold text-center">💳 Paiement</h1>

      {/* Récapitulatif de la commande */}
      <div className="p-6 border rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">🛍️ Récapitulatif de la commande</h2>
        
        <div className="flex flex-wrap gap-6">
          {/* Section Produits */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {panier.map((produit) => (
                <div key={produit.id} className="bg-white border shadow-md p-3 flex flex-col items-center hover:shadow-xl transition-shadow duration-200">
                  <Image src={produit.image} alt={produit.title}  className="w-24 h-24 object-contain mb-4 rounded-lg"  height={500} width={500} />
                  <h3 className="font-semibold text-center mb-2 text-lg">{produit.title}</h3>
                  <p className="text-gray-600 mb-4">${produit.price}</p>

                  {/* Quantité et actions */}
                  <div className="flex items-center gap-2 mb-4">
                    <button 
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition duration-200"
                      onClick={() => updateQuantite(produit.id, "moins")}>
                      -
                    </button>
                    <span>{produit.quantite}</span>
                    <button 
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition duration-200"
                      onClick={() => updateQuantite(produit.id, "plus")}>
                      +
                    </button>
                  </div>

                  {/* Bouton de suppression */}
                  <button 
                    className="px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200"
                    onClick={() => removeProduit(produit.id)}>
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section Total à payer */}
          <div className="w-full sm:w-auto mt-6 sm:mt-0 flex-shrink-0 bg-white border rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">Total à payer</h2>
              <p className="text-2xl font-semibold mb-6">${total.toFixed(2)}</p>
              <button className="w-full px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition duration-200">
                Payer💳
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Informations du client */}
      <div className="p-6 border rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">📋 Informations du Client</h2>
        <p><strong>Nom :</strong> {clientInfo.nom} {clientInfo.prenom}</p>
        <p><strong>Email :</strong> {clientInfo.email}</p>
        <p><strong>Téléphone :</strong> {clientInfo.telephone}</p>
        <p><strong>Adresse :</strong> {clientInfo.adresse}, {clientInfo.ville}, {clientInfo.region}, {clientInfo.continent}</p>
        <p><strong>Code Postal :</strong> {clientInfo.postalCode}</p>
      </div>
    </main>
  );
}
