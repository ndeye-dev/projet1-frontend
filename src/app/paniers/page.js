"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function PanierPage() {
  const router = useRouter();
  const [panier, setPanier] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    telephone: "",
    nom: "",
    prenom: "",
    continent: "",
    region: "",
    adresse: "",
    ville: "",
    postalCode: "",
  });
  const [erreur, setErreur] = useState("");

  // Charger le panier depuis localStorage
  useEffect(() => {
    const panierStocke = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(panierStocke);
  }, []);

  // Mettre à jour localStorage après modification du panier
  const mettreAJourPanier = (nouveauPanier) => {
    setPanier(nouveauPanier);
    localStorage.setItem("panier", JSON.stringify(nouveauPanier));
  };

  // Gestion du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    for (const key in formData) {
      if (!formData[key]) {
        setErreur("Veuillez remplir tous les champs.");
        return;
      }
    }

    // Nettoyer l'erreur
    setErreur("");

    // Enregistrer les infos du client dans localStorage (pour simuler une base de données)
    localStorage.setItem("clientInfo", JSON.stringify(formData));

    // Rediriger vers la page de paiement
    router.push("/paiement");
  };

  // Calcul du total
  const total = panier.reduce((acc, produit) => acc + produit.price * produit.quantite, 0);

  return (
    <main className="p-0 md:p-8 flex flex-col bg-gray-100 justify-center items-center max-w-screen-xl mx-auto">
      <Link href="/produits" className="text-gray-500 font-semibold hover:underline self-start">← Retour</Link>

      <div className="w-full flex flex-col md:flex-row p-8 justify-between space-x-8 gap-8">
        {/* Formulaire Client */}
        <div className="w-xs md:w-lg">
          {erreur && <p className="text-red-500 text-center">{erreur}</p>}
          <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <h2 className="text-lg font-semibold">📋 Contact Infos</h2>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 col md:col-span-2" required />
            <input type="tel" name="telephone" placeholder="Téléphone" onChange={handleChange} className="border p-2 col md:col-span-2" required />
            <h2 className="text-lg font-semibold">📋 Shipping Adresse</h2> <br/>
            <input type="text" name="nom" placeholder="Nom" onChange={handleChange} className="border p-2" required />
            <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} className="border p-2" required />
            <input type="text" name="continent" placeholder="Continent" onChange={handleChange} className="border p-2 col md:col-span-2" required />
            <input type="text" name="region" placeholder="Région" onChange={handleChange} className="border p-2 col md:col-span-2" required />
            <input type="text" name="adresse" placeholder="Adresse" onChange={handleChange} className="border p-2 col md:col-span-2" required />
            <input type="text" name="ville" placeholder="Ville" onChange={handleChange} className="border p-2" required />
            <input type="text" name="postalCode" placeholder="Code Postal" onChange={handleChange} className="border  p-2" required />

            <button type="submit" className="col md:col-span-2 mt-4 px-4 py-2 bg-gray-600 text-white rounded">
              Passer au paiement 💳
            </button>
          </form>
        </div>

        {/* Panier */}
        <div className=" md:w-sm  border  border-gray-400 p-5 mt-8 md:mt-0">
          <h1 className="text-2xl font-bold mt-4 text-center">🛒 Votre Panier</h1>
          {panier.length === 0 ? (
            <p className="mt-4 text-center">Votre panier est vide.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {panier.map((produit) => (
                <div key={produit.id} className="flex items-center gap-4 border-b py-4">
                  <Image src={produit.image} alt={produit.title} height={500} width={900} className="w-16 h-16 object-contain" />
                  <div className="flex-1">
                    <h2 className="font-semibold">{produit.title}</h2>
                    <p>${produit.price} x {produit.quantite}</p>
                  </div>
                </div>
              ))}
              <p className="text-lg font-bold mt-4 text-right">Total : ${total.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
