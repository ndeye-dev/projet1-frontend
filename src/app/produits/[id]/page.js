"use client";
import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
// import Nav from "@/app/components/Nav";

export default function ProduitDetail({ params }) {
    const id = use(params).id; // Corrige l'accès aux paramètres
    const [produit, setProduit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favori, setFavori] = useState(false);
    const [ajoute, setAjoute] = useState(false); // État pour indiquer si le produit est ajouté

    const couleurs = {
        Red: "bg-red-500",
        Blue: "bg-blue-500",
        Green: "bg-green-500",
        Yellow: "bg-yellow-500",
        Black: "bg-black"
    };
    useEffect(() => {
        if (!id) return notFound();

        axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then((res) => setProduit(res.data))
            .catch(() => setError("Erreur lors du chargement du produit"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="p-8">Chargement...</p>;
    if (error) return <p className="p-8 text-red-500">{error}</p>;
    if (!produit) return notFound();

    const ajouterAuPanier = () => {
        const panier = JSON.parse(localStorage.getItem("panier")) || [];
        const indexProduit = panier.findIndex((p) => p.id === produit.id);

        if (indexProduit !== -1) {
            // Si le produit est déjà dans le panier, on augmente sa quantité
            panier[indexProduit].quantite += 1;
        } else {
            // Sinon, on l'ajoute avec une quantité de 1
            panier.push({ ...produit, quantite: 1 });
        }

        localStorage.setItem("panier", JSON.stringify(panier));
        setAjoute(true);

        // Réinitialiser l'état après 2 secondes
        setTimeout(() => setAjoute(false), 2000);
    };

    const toggleFavori = () => {
        let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

        if (favori) {
            // Supprimer des favoris
            favoris = favoris.filter((p) => p.id !== produit.id);
        } else {
            // Ajouter aux favoris
            favoris.push(produit);
        }

        localStorage.setItem("favoris", JSON.stringify(favoris));
        setFavori(!favori);
    };

    return (
        <main className="p-8 max-w-screen-xl mx-auto">

            <Link href="/produits" className="text-gray-500 font-semibold hover:underline">
                ← Retour
            </Link>
            <div className="mt-6 flex flex-col md:flex-row gap-8 md:gap-12  justify-center items-stretch">
                {/* Image produit */}
                <div className="border  shadow-lg p-4 bg-gray-300 flex justify-center items-center max-w-xs h-auto">
                    <Image
                        src={produit.image}
                        alt={produit.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain rounded-lg"
                    />
                </div>

                {/* Détails produit */}
                <div className="border  shadow-lg p-6 relative bg-white flex flex-col justify-between max-w-xs h-auto">
                     {/* Bouton Favoris */}
                     <button onClick={toggleFavori} className="self-end absolute top-0 end-0 text-2xl">
                        {favori ? "❤️" : "🤍"}
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">{produit.title}</h1>
                    <p className="text-xl text-gray-600 mt-2">${produit.price}</p>
                    {/* <p className="mt-4 text-gray-700">{produit.description}</p> */}
                    <p className="mt-2 text-gray-500">Catégorie : {produit.category}</p>
                    <p className="mt-2 text-yellow-500">
                        ⭐ {produit.rating.rate} ({produit.rating.count} avis)
                    </p>

                   
                    <div className="space-x-3 mt-4">
                    <p className="mt-2 text-gray-500">Couleurs </p>
                        {Object.entries(couleurs).map(([nom, classe]) => (
                            <button key={nom} className={`w-9 h-9 ${classe}`} />
                        ))}
                    </div>

                    {/* Bouton Ajouter au panier */}
                    <button
                        onClick={ajouterAuPanier}
                        className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Ajouter au panier 🛒
                    </button>

                    {/* Message de confirmation */}
                    {ajoute && <p className="mt-2 text-green-500">Produit ajouté au panier ✅</p>}
                </div>
            </div>
        </main>
    );
}
