// //src/app/favoris/page.js
// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Nav from "../components/Nav";
// import Image from "next/image";

// export default function FavorisPage() {
//     const [favoris, setFavoris] = useState([]);

//     // Charger les favoris depuis le localStorage au chargement de la page
//     useEffect(() => {
//         const favorisStockés = JSON.parse(localStorage.getItem("favoris")) || [];
//         setFavoris(favorisStockés);
//     }, []);

//     // Supprimer un favori
//     const supprimerFavori = (id) => {
//         const nouveauxFavoris = favoris.filter((produit) => produit.id !== id);
//         setFavoris(nouveauxFavoris);
//         localStorage.setItem("favoris", JSON.stringify(nouveauxFavoris));
//     };

//     return (
//         <main className="p-8 max-w-screen-xl mx-auto">
//             <Nav/>
//             <h1 className="text-2xl mt-14 font-bold mb-6">Produits Favoris</h1>

//             {favoris.length === 0 ? (
//                 <p className="text-gray-500">Aucun produit en favori.</p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {favoris.map((produit) => (
//                         <div key={produit.id} className="border p-4 shadow-lg bg-white rounded-lg">
//                             {/* Image */}
//                             <div className="flex justify-center">
//                                 <Image
//                                     src={produit.image}
//                                     alt={produit.title}
//                                     width={500}
//                                     height={500}
//                                     className="w-32 h-32 object-contain"
//                                 />
//                             </div>

//                             {/* Infos */}
//                             <h2 className="mt-2 text-lg font-semibold">{produit.title}</h2>
//                             <p className="text-gray-600">${produit.price}</p>

//                             {/* Actions */}
//                             <div className="mt-4 flex justify-between">
//                                 <button
//                                     onClick={() => supprimerFavori(produit.id)}
//                                     className="text-red-500 hover:underline"
//                                 >
//                                     Retirer ❌
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </main>
//     );
// }
"use client";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Image from "next/image";

export default function FavorisPage() {
    const [favoris, setFavoris] = useState([]);
    const [count, setCount] = useState(0); // Compteur de favoris

    // Charger les favoris depuis localStorage
    useEffect(() => {
        const chargerFavoris = () => {
            try {
                const favorisStockés = JSON.parse(localStorage.getItem("favoris")) || [];
                if (Array.isArray(favorisStockés)) {
                    setFavoris(favorisStockés);
                    setCount(favorisStockés.length);
                } else {
                    setFavoris([]);
                    setCount(0);
                }
            } catch (error) {
                console.error("Erreur de chargement des favoris :", error);
                setFavoris([]);
                setCount(0);
            }
        };

        chargerFavoris();

        // Écoute des changements sur localStorage (utile si un autre onglet modifie les favoris)
        const handleStorageChange = (event) => {
            if (event.key === "favoris") {
                chargerFavoris();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Supprimer un favori
    const supprimerFavori = (id) => {
        const nouveauxFavoris = favoris.filter((produit) => produit.id !== id);
        setFavoris(nouveauxFavoris);
        setCount(nouveauxFavoris.length);
        localStorage.setItem("favoris", JSON.stringify(nouveauxFavoris));
    };

    return (
        <main className="p-8 max-w-screen-xl mx-auto">
            <Nav />
            <h1 className="text-2xl mt-14 font-bold mb-6"> Produits Favoris ({count})</h1>

            {favoris.length === 0 ? (
                <p className="text-gray-500">Aucun produit en favori.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favoris.map((produit) => (
                        <div key={produit.id} className="border p-4 shadow-lg bg-white rounded-lg">
                            {/* Image */}
                            <div className="flex justify-center">
                                <Image
                                    src={produit.image}
                                    alt={produit.title}
                                    width={500}
                                    height={500}
                                    className="w-32 h-32 object-contain"
                                />
                            </div>

                            {/* Infos */}
                            <h2 className="mt-2 text-lg font-semibold">{produit.title}</h2>
                            <p className="text-gray-600">{produit.price} F</p>

                            {/* Actions */}
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => supprimerFavori(produit.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Retirer ❌
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
