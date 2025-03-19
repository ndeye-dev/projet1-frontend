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
    <div className="bg-gray-50">
    <main className="p-8 max-w-screen-xl mx-auto space-y-8  ">
      <a href="/paniers" className="text-gray-600 font-semibold hover:underline">← Retour au panier</a>

      {/* Conteneur principal en grille */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-16">
        {/* Section Panier */}
        <div className="">
          <h2 className="text-2xl font-bold  ">Valder la demande</h2>
          <div className="">
            {panier.map((produit) => (
              <div key={produit.id} className="p-4 shadow-md rounded-lg flex flex-col items-center">
                <Image src={produit.image} alt={produit.title} width={150} height={150} className="w-32 h-32 object-contain mb-4" />
                <h3 className="font-semibold text-center text-lg">{produit.title}</h3>
                <p className="text-gray-600 mb-4">${produit.price.toFixed(2)}</p>

                {/* Quantité */}
                <div className="flex items-center gap-3 mb-4">
                  <button 
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition duration-200"
                    onClick={() => updateQuantite(produit.id, "moins")}>
                    -
                  </button>
                  <span className="text-lg font-semibold">{produit.quantite}</span>
                  <button 
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition duration-200"
                    onClick={() => updateQuantite(produit.id, "plus")}>
                    +
                  </button>
                </div>

                <button 
                  className="px-3 py-1 text-white rounded-full hover:bg-red-700 transition duration-200"
                  onClick={() => removeProduit(produit.id)}>
                 🗑
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="shadow-md p-10 rounded-lg flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-10">Total à payer</h2>
          <p className="text-2xl font-semibold mb-6">${total.toFixed(2)}</p>
          <button className="w-48 px-3 py-2 bg-gray-400 text-white text-lg font-semibold rounded-lg">
            Payer
          </button>
        </div>
      </div>

      
      
    </main>
    <div className="p-6 shadow-md  rounded-lg mx-auto p-19">
    <h2 className="text-2xl font-bold mb-4">Informations du Client</h2>
    <p><strong>Nom :</strong> {clientInfo.nom} {clientInfo.prenom}</p>
    <p><strong>Email :</strong> {clientInfo.email}</p>
    <p><strong>Téléphone :</strong> {clientInfo.telephone}</p>
    <p><strong>Adresse :</strong> {clientInfo.adresse}, {clientInfo.ville}, {clientInfo.region}, {clientInfo.continent}</p>
    <p><strong>Code Postal :</strong> {clientInfo.postalCode}</p>
  </div>
  </div>
  );
}
