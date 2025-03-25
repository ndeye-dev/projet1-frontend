"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Nav from "../components/Nav";
import Image from "next/image";
import styled from "styled-components";

const StyledContainer = styled.div`
  font-family: 'Beatrice Deck Trial', sans-serif;
`;
//

export default function ProduitsPage() {
    const [produits, setProduits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filtreCategorie, setFiltreCategorie] = useState("");
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(response => {
                setProduits(response.data);
                const uniqueCategories = [...new Set(response.data.map(p => p.category))];
                setCategories(uniqueCategories);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Erreur lors du chargement des produits :", error);
                setError("Erreur lors du chargement des produits.");
                setIsLoading(false);
            });
    }, []);

    // Filtrage des produits selon la catégorie et la recherche
    const produitsFiltres = produits.filter(produit =>
        (filtreCategorie === "" || produit.category === filtreCategorie) &&
        produit.name.toLowerCase().includes(search.toLowerCase())

    );
    //
    return (
        <div className="bg-gray-50">
            <StyledContainer>
                <div>
                    <Nav />
                </div>
                <div className="font-beatrice flex flex-wrap md:flex-nowrap mt-16 p-3 ">
                    {/* Sidebar avec les catégories */}
                    <div className="w-full md:w-1/4 lg:w-1/5 p-6">
                        <Sidebar categories={categories} setFiltreCategorie={setFiltreCategorie} />
                    </div>

                    {/* Section des produits */}
                    <div className="w-full md:w-3/4 lg:w-4/5 p-6">
                        <div className="flex gap-3">
                            <Link href="/accueil">
                                <span>Home /</span>
                            </Link>
                            <Link href="/produits">
                                <span className="font-bold">Products</span>
                            </Link>
                        </div>
                        <h1 className="text-2xl font-bold mb-6">Produits</h1>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            {/* Recherche des produits */}
                            <input
                                className="border border-gray-300 bg-gray-300 rounded-md px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="🔍 Rechercher un produit..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            {/* Filtre par catégorie */}
                            <div className="flex gap-3 flex-wrap">
                                <button
                                    className={`border border-gray-300 px-3 py-2 rounded-md ${filtreCategorie === "" ? "bg-gray-200" : "border border-gray-300"}`}
                                    onClick={() => setFiltreCategorie("")}
                                >
                                    Tous
                                </button>
                                {categories.map((cat, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 rounded-md ${filtreCategorie === cat ? "bg-gray-200" : "border border-gray-300"}`}
                                        onClick={() => setFiltreCategorie(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Affichage des produits filtrés */}
                        {isLoading ? (
                            <p className="text-center text-gray-500">Chargement...</p> // Message de chargement
                        ) : error ? (
                            <p className="text-center text-red-500">{error}</p> // Message d'erreur
                        ) : produitsFiltres.length === 0 ? (
                            <p className="text-center text-gray-500">Aucun produit trouvé.</p>
                        ) : (
                          
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {produitsFiltres.map((produit, index) => (
                                    <Link
                                        key={produit._id || index}
                                        href={`/produits/${produit._id}`}
                                        className="block bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105"
                                    >
                                        <Image
                                            src={produit.image || "https://via.placeholder.com/500"}
                                            alt={produit.name ? `Image de ${produit.name}` : "Image de produit"}
                                            width={500}
                                            height={500}
                                            className="w-full h-40 object-cover mb-3 rounded-md"
                                            unoptimized
                                        />
                                        <h2 className="text-gray-500 font-semibold">{produit.name}</h2>
                                        <div className="flex justify-between items-center mt-2">
                                            <h2 className="text-gray-700 font-semibold">{produit.description}</h2>
                                            <p className="text-gray-700 font-bold">{produit.price} FCFA</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                        )}
                    </div>
                </div>
            </StyledContainer>
        </div>
    );
}

