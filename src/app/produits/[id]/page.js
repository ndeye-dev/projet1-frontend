"use client";
import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/app/components/Nav";

export default function ProduitDetail() {
    const { id } = useParams(); 
    const [produit, setProduit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favori, setFavori] = useState(false);
    const [ajoute, setAjoute] = useState(false);

    const couleurs = {
        Red: "bg-gray-300",
        Blue: "bg-black",
        Green: "bg-gray-500",
        Yellow: "bg-blue-200",
        Black: "bg-gray-200"
    };

    // Charger le produit depuis l'API
    useEffect(() => {
        if (!id) return notFound();

        axios
            .get(`http://localhost:5000/api/products/${id}`)
            .then((res) => {
                setProduit(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Erreur lors du chargement du produit");
                setLoading(false);
            });
    }, [id]);

    // Vérifier si le produit est en favori au chargement
    useEffect(() => {
        if (!produit) return;
        const favoris = JSON.parse(localStorage.getItem("favoris")) || [];
        setFavori(favoris.some((p) => p._id.toString() === produit._id.toString()));
    }, [produit]);

    if (loading) return <p className="p-8">Chargement...</p>;
    if (error) return <p className="p-8 text-red-500">{error}</p>;
    if (!produit) return notFound();

    // Ajouter au panier
    const ajouterAuPanier = () => {
        const panier = JSON.parse(localStorage.getItem("panier")) || [];
        const indexProduit = panier.findIndex((p) => p._id === produit._id);

        if (indexProduit !== -1) {
            panier[indexProduit].quantite += 1;
        } else {
            panier.push({ ...produit, quantite: 1 });
        }

        localStorage.setItem("panier", JSON.stringify(panier));
        setAjoute(true);

        setTimeout(() => setAjoute(false), 2000);
    };

    // Ajouter ou retirer des favoris
    const toggleFavori = () => {
        let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

        if (favori) {
            favoris = favoris.filter((p) => p._id.toString() !== produit._id.toString());
        } else {
            favoris.push(produit);
        }

        localStorage.setItem("favoris", JSON.stringify(favoris));
        setFavori(!favori);
    };

    return (
        <main className="p-8 max-w-screen-xl mx-auto">
            <Nav />
            <div className="mt-10 p-6">
                <Link href="/produits" className="text-gray-500 font-semibold hover:underline mt-10">
                    ← Retour
                </Link>
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-stretch">
                {/* Image produit */}
                <div className="border bg-gray-100 shadow-lg p-4 flex justify-center items-center max-w-xs h-auto">
                    <Image
                        src={produit.image}
                        alt={produit.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain rounded-lg"
                    />
                </div>

                {/* Détails produit */}
                <div className="border shadow-lg p-6 relative bg-white flex flex-col justify-between max-w-xs h-auto">
                    <button onClick={toggleFavori} className="self-end absolute top-0 end-0 text-2xl">
                        {favori ? "❤️" : "🤍"}
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">{produit.name}</h1>
                    <p className="text-xl text-gray-600 mt-2">${produit.price}</p>
                    <p className="mt-2 text-gray-500">Catégorie : {produit.category || "Non spécifiée"}</p>
                    <p className="mt-2 text-yellow-500">
                        ⭐ {produit.rating ? produit.rating.rate : "N/A"} 
                        ({produit.rating ? produit.rating.count : "0"} avis)
                    </p>

                    <div className="space-x-3 mt-4">
                        <p className="mt-2 text-gray-500">Couleurs</p>
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
