//src/app/produits/page.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Nav from "../components/Nav";
import Image from "next/image";
import styled from "styled-components";

const StyledText = styled.p`
  font-family: 'Beatrice Deck Trial', sans-serif;
  
`;
export default function ProduitsPage() {
    const [produits, setProduits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filtreCategorie, setFiltreCategorie] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then(response => {
                setProduits(response.data);
                const uniqueCategories = [...new Set(response.data.map(p => p.category))];
                setCategories(uniqueCategories);
            })
            .catch(error => console.error("Erreur lors du chargement des produits :", error));
    }, []);

    const produitsFiltres = produits.filter(produit =>
        (filtreCategorie === "" || produit.category === filtreCategorie) &&
        produit.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        
        <div className=" bg-gray-50">
            <StyledText>
            <div>
                <Nav/>
            </div>
            <div className="font-beatrice flex flex-wrap md:flex-nowrap mt-16 p-3 ">
                <div className="w-full md:w-1/4 lg:w-1/5 p-6  ">
                    <Sidebar />
                </div>

                <div className="w-full md:w-3/4 lg:w-4/5 p-6">
                    <div className="flex gap-3">
                        <Link href="/accueil"><p className="">Home /</p></Link>
                        <Link href="/produits"><p className="font-bold">Products</p></Link>
                    </div>
                    <h1 className="text-2xl font-bold mb-6 "> Produits</h1>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <input
                            className="border border-gray-300 bg-gray-300 rounded-md px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="🔍 Rechercher un produit..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div className="flex gap-3 flex-wrap">
                            <button
                                className={`border border-gray-300 px-3 py-2 rounded-md ${filtreCategorie === "" ? " bg-gray-200" : "border border-gray-300"}`}
                                onClick={() => setFiltreCategorie("")}
                            >
                                Tous
                            </button>
                            {categories.map((cat, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 rounded-md ${filtreCategorie === cat ? " bg-gray-200" : "border border-gray-300"}`}
                                    onClick={() => setFiltreCategorie(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {produitsFiltres.length === 0 ? (
                        <p className="text-center text-gray-500">Aucun produit trouvé.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {produitsFiltres.map(produit => (
                                <Link
                                    key={produit.id}
                                    href={`/produits/${produit.id}`}
                                    className="border  p-4 bg-gray-100 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1"
                                >
                                    <Image
                                        src={produit.image}
                                        alt={produit.title}
                                        width={500}
                                        height={500}
                                        className="w-full h-40 object-contain mb-3"
                                    />
                                    <h2 className="text- text-wrap text-gray-700 font-semibold">{produit.title}</h2>
                                    <p className="font-bold">${produit.price}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            </StyledText>
        </div>

    );
}
