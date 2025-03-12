//src/app/favoris/page.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import Image from "next/image";

export default function FavorisPage() {
    const [favoris, setFavoris] = useState([]);

    // Charger les favoris depuis le localStorage au chargement de la page
    useEffect(() => {
        const favorisStockés = JSON.parse(localStorage.getItem("favoris")) || [];
        setFavoris(favorisStockés);
    }, []);

    // Supprimer un favori
    const supprimerFavori = (id) => {
        const nouveauxFavoris = favoris.filter((produit) => produit.id !== id);
        setFavoris(nouveauxFavoris);
        localStorage.setItem("favoris", JSON.stringify(nouveauxFavoris));
    };

    return (
        <main className="p-8 max-w-screen-xl mx-auto">
            <Nav/>
            <h1 className="text-2xl mt-14 font-bold mb-6">Produits Favoris</h1>

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
                            <p className="text-gray-600">${produit.price}</p>

                            {/* Actions */}
                            <div className="mt-4 flex justify-between">
                                {/* <Link
                                    href={`/produit/${produit.id}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Voir
                                </Link> */}
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

// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Nav from "../components/Nav";
// import Image from "next/image";

// export default function FavorisPage() {
//     const [favoris, setFavoris] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Charger les favoris depuis le backend
//     useEffect(() => {
//         const fetchFavoris = async () => {
//             try {
//                 const res = await fetch("/api/favoris", {
//                     credentials: "include", // si besoin d'authentification
//                 });
//                 const data = await res.json();
//                 if (res.ok) {
//                     setFavoris(data);
//                 } else {
//                     console.error("Erreur lors du chargement :", data.message);
//                 }
//             } catch (error) {
//                 console.error("Erreur serveur :", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFavoris();
//     }, []);

//     // Supprimer un favori depuis le backend
//     const supprimerFavori = async (produitId) => {
//         try {
//             const res = await fetch(`/api/favoris/${produitId}`, {
//                 method: "DELETE",
//                 credentials: "include",
//             });

//             if (res.ok) {
//                 setFavoris((prevFavoris) => prevFavoris.filter((p) => p.produit._id !== produitId));
//             } else {
//                 const data = await res.json();
//                 console.error("Erreur :", data.message);
//             }
//         } catch (error) {
//             console.error("Erreur serveur :", error);
//         }
//     };

//     return (
//         <main className="p-8 max-w-screen-xl mx-auto">
//             <Nav />
//             <h1 className="text-2xl mt-14 font-bold mb-6">⭐ Produits Favoris</h1>

//             {loading ? (
//                 <p>Chargement...</p>
//             ) : favoris.length === 0 ? (
//                 <p className="text-gray-500">Aucun produit en favori.</p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {favoris.map(({ produit }) => (
//                         <div key={produit._id} className="border p-4 shadow-lg bg-white rounded-lg">
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
//                                     onClick={() => supprimerFavori(produit._id)}
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
