"use client";
import { useState, useEffect } from 'react';
import { FiHeart, FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import Image from 'next/image';
import logo from '../../img/logo.png';
import Link from 'next/link';

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [panierCount, setPanierCount] = useState(0);
    const [nombreFavori, setNombreFavori] = useState(0);

    const handleLogout = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        localStorage.removeItem("token");
        window.location.href = "/auth/connexion"; 
    };

    useEffect(() => {
        const updatePanierCount = () => {
            const panier = JSON.parse(localStorage.getItem("panier")) || [];
            const totalItems = panier.reduce((acc, item) => acc + (item.quantite || 1), 0);
            setPanierCount(totalItems);
        };

        updatePanierCount();
        window.addEventListener("storage", updatePanierCount);

        return () => window.removeEventListener("storage", updatePanierCount);
    }, []);

    useEffect(() => {
        const updateFavori = () => {
            const favori = JSON.parse(localStorage.getItem("favoris")) || []; // Correction du nom
            setNombreFavori(favori.length); // On compte simplement le nombre d'éléments
        };

        updateFavori();
        window.addEventListener("storage", updateFavori);

        return () => window.removeEventListener("storage", updateFavori);
    }, []);

    return (
        <nav className="bg-gray-50 shadow-md w-full fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Partie gauche */}
                    <div className="hidden md:flex space-x-6">
                        <Link href="/accueil" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
                        <Link href="/produits" className="text-gray-700 hover:text-blue-600 font-medium">Produits</Link>
                        <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">New</Link>
                    </div>

                    {/* Logo */}
                    <div className="flex items-center justify-center">
                        <Image src={logo} alt="Logo" />
                    </div>

                    {/* Icônes */}
                    <div className="hidden md:flex space-x-4 items-center">
                        {/* Favoris */}
                        <Link href="/favoris" className="relative rounded-[20px] p-2 bg-black text-white">
                            <FiHeart size={24} />
                            {nombreFavori > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-sm font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {nombreFavori}
                                </span>
                            )}
                        </Link>

                        {/* Panier */}
                        <Link href="/paniers" className="relative rounded-[20px] p-2 bg-black text-white">
                            {/* <FiShoppingCart size={24} /> */}Cart
                            {panierCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-sm font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {panierCount}
                                </span>
                            )}
                        </Link>

                        {/* Profil */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="rounded-[20px] p-2 bg-black text-white"
                            >
                                <FiUser size={24} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md">
                                    <Link href="/profil" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Profil
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <FiLogOut className="mr-2" /> Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Menu Mobile */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 hover:text-blue-600">
                            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full">
                    <div className="flex flex-col m-8 space-y-4">
                        <Link href="/accueil" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
                        <Link href="/produits" className="text-gray-700 hover:text-blue-600 font-medium">Produits</Link>
                        <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">New</Link>
                        
                        {/* Icônes mobiles */}
                        <div className="flex space-x-6">
                            {/* Favoris */}
                            <Link href="/favoris" className="relative rounded-[20px] p-2 bg-black text-white">
                                <FiHeart size={24} />
                                {nombreFavori > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {nombreFavori}
                                    </span>
                                )}
                            </Link>

                            {/* Panier */}
                            <Link href="/paniers" className="relative rounded-[20px] p-2 bg-black text-white">
                                {/* <FiShoppingCart size={24} /> */}Cart
                                {panierCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {panierCount}
                                    </span>
                                )}
                            </Link>

                            {/* Profil */}
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="rounded-[20px] p-2 bg-black text-white"
                            >
                                <FiUser size={24} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md">
                                    <Link href="/profil" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Profil
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <FiLogOut className="mr-2" /> Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
