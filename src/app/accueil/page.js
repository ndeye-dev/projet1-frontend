'use client';

import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Nav from "../components/Nav";
import Footer from "../components/Footer";

// Conteneur principal
export default function Home() {
    const [produits, setProduits] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => prev + 1);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
    };

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const res = await fetch("https://fakestoreapi.com/products");
                const data = await res.json();
                setProduits(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits:", error);
            }
        };

        fetchProduits();
    }, []);

    return (

        <div className="bg-gray-50 bg-opacity-40">
            <Nav />
            <div className="text-sm space-y-1 mt-16 max-w-7xl mx-auto  p-6">
                <div>NEW</div>
                <div>WOMEN</div>
                <div>KIDS</div>
                <div className="text-black"><input className="bg-gray-300 p-2 w-72" placeholder="🔍        recherche" /></div>
            </div>
            <div className="max-w-7xl mx-auto  p-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    <div>
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            New <br /> <span className="">Collection</span>
                        </h2>
                        <div className="mb-4 space-x-4">
                            <p className="text-lg text-gray-600">Summer</p>
                            <p className="text-lg text-gray-600">2024</p>
                        </div>
                        <div className="flex items-center mt-7 md:mt-60  space-x-4">
                            <button className="flex items-center w-50 gap-3 px-6 py-2 bg-gray-200 hover:bg-gray-300 border  transition duration-200 ease-in-out">
                                <span className="text-sm">Go To Shop</span>
                                <FiArrowRight className=" h-5 text-gray-800" />
                            </button>
                            <div className="flex space-x-2">
                                <button onClick={prevSlide} className="p-2 bg-gray-300 hover:bg-gray-400 border transition">
                                    <FiChevronLeft className="w-5 h-5 text-gray-700" />
                                </button>
                                <button onClick={nextSlide} className="p-2 bg-gray-300 hover:bg-gray-400 border transition">
                                    <FiChevronRight className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {produits.slice(0, 2).map((produit) => (
                        <Link key={produit.id} href="/produits" className="bg-gray-100 w-72  shadow-lg  overflow-hidden">
                            <img src={produit.image} alt={produit.title} className="w-full  object-cover" />
                            <div className="p-4">

                            </div>
                        </Link>
                    ))}
                </div>

                <div className=" mt-40 ">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                        New <br /> <span className="">This Week</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {produits.slice(0, 4).map((produit) => (
                            <Link key={produit.id} href="/produits" className="bg-white shadow-lgoverflow-hidden">
                                <img src={produit.image} alt={produit.title} className="w-full bg-gray-100 p-2  h-72 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{produit.title}</h3>
                                    <p className="text-gray-600">{produit.price}€</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className=" mt-40 ">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                        XIV <br /> <span className="">Collections</span> <br />  23-24
                    </h2>
                    <div className="flex justify-between items-center mb-6">
                        <ul className="flex space-x-6">
                            <li className="font-bold text-gray-800 cursor-pointer">ALL</li>
                            <li className="text-gray-600 cursor-pointer">Men</li>
                            <li className="text-gray-600 cursor-pointer">Women</li>
                            <li className="text-gray-600 cursor-pointer">Kid</li>
                        </ul>
                        <div className="flex space-x-6">
                            <div>
                                <p className="font-semibold text-gray-800">Filters (+)</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Sorts (-)</p>
                                <p className="text-gray-400">Less to More</p>
                                <p className="text-gray-400">More to Less</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {produits.slice(0, 3).map((produit) => (
                            <Link key={produit.id} href="/produits" className="bg-white w-72 shadow-lgoverflow-hidden">
                                <img src={produit.image} alt={produit.title} className="w-full h-72 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{produit.title}</h3>
                                    <p className="text-gray-600">{produit.price}€</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className=" mt-40 ">
                    <h2 className="text-4xl font-semibold text-center text-gray-900 mb-6">
                        Our Approach to Fashion Design
                    </h2>
                    <p className="text-lg text-center text-gray-600 mb-6">
                        At Elegant Vogue, we blend creativity with craftsmanship to create fashion  <br /> that transcends trends and stands the test of time.
                        Each design is meticulously  <br /> crafted, ensuring the highest quality and exquisite finish.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {produits.slice(0, 4).map((produit) => (
                            <Link key={produit.id} href="/produits" className="bg-gray-100 shadow-lgoverflow-hidden">
                                <img src={produit.image} alt={produit.title} className="w-full h-72 object-cover" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
