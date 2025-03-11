'use client';
import { useState } from 'react';
import { FiHeart, FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import Image from 'next/image'
import logo from '../../img/logo.png'
import Link from 'next/link';

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        // Supprimer le token du cookie
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    
        // Supprimer le token du localStorage si vous l'utilisez
        localStorage.removeItem("token");
    
        // Redirection vers la page de connexion
        window.location.href = "/auth/connexion"; 
    };
    

    return (
        <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Partie gauche : Home, Produits, New */}
                    <div className="hidden md:flex space-x-6">
                        <Link href="/accueil" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
                        <Link href="/produits" className="text-gray-700 hover:text-blue-600 font-medium">Produits</Link>
                        <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">New</Link>
                    </div>

                    {/* Logo au centre */}
                    <div className="flex items-center justify-center text-center">
                        {/* <a href="#" className="text-2xl font-bold text-gray-800">MonLogo</a> */}
                        <div>
                        <Image
                            src={logo}
                            alt="Picture of the author"

                        />
                        </div>
                     
                    </div>

                    {/* Partie droite : Favoris, Panier, Profil */}
                    <div className="hidden md:flex space-x-4 items-center">
                        <a href="favoris" className="text-gray-700 hover:text-blue-600"><FiHeart size={24} /></a>
                        <a href="paniers" className="text-gray-700 hover:text-blue-600"><FiShoppingCart size={24} /></a>

                        {/* Dropdown Profil */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="text-gray-700 hover:text-blue-600 focus:outline-none"
                            >
                                <FiUser size={24} />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md">
                                    <a href="/profil" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profil</a>
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

                    {/* Bouton Toggle (mobile) */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 hover:text-blue-600">
                            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu mobile */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full">
                    <div className="flex flex-col items-center space-y-4 py-4">
                    <Link href="/accueil" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
                        <Link href="/produits" className="text-gray-700 hover:text-blue-600 font-medium">Produits</Link>
                        <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">New</Link>
                        <div className="flex space-x-6">
                        <a href="favoris" className="text-gray-700 hover:text-blue-600"><FiHeart size={24} /></a>
                        <a href="paniers" className="text-gray-700 hover:text-blue-600"><FiShoppingCart size={24} /></a>

                            {/* Dropdown Profil (mobile) */}
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="text-gray-700 hover:text-blue-600 focus:outline-none"
                                >
                                    <FiUser size={24} />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md">
                                        <a href="/profil" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profil</a>
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
                </div>
            )}
        </nav>
    );
}
