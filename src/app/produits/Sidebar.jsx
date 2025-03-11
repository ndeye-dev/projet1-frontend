"use client";
import React, { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Toggle pour le sidebar
  const [expanded, setExpanded] = useState({
    size: false,
    availability: false,
    categories: false,
    color: false,
    price: false,
    collection: false,
    tags: false,
    rating: false,
  });

  // Toggle d'expansion pour chaque section
  const toggleExpansion = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="">
      {/* Bouton de toggle pour ouvrir/fermer le sidebar */}
      <button
        className="md:hidden text-2xl text-blue-500 absolute top-28 left-4 z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "⏹️" : "➡️"}
      </button>

      {/* Sidebar coulissant */}
      <div
        className={`fixed top-0 left-0 w-64 h-full  mt-36 bg-gray-100 shadow-md z-10 p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:block`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Filtres</h1>
          {/* Bouton de toggle visible uniquement en mobile */}
          <button
            className="md:hidden text-xl text-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "⏹️" : "➡️"}
          </button>
        </div>

        {/* Taille */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-lg mb-2">Taille</h2>
            <button onClick={() => toggleExpansion("size")} className="text-blue-500">
              {expanded.size ? "▼" : "▶️"}
            </button>
          </div>
          {expanded.size && (
            <div className="flex flex-wrap gap-2">
              {['XL', 'L', '2XL', 'M'].map((size, index) => (
                <button
                  key={index}
                  className="border px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Disponibilité */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-lg mb-2">Disponibilité</h2>
            <button onClick={() => toggleExpansion("availability")} className="text-blue-500">
              {expanded.availability ? "▼" : "▶️"}
            </button>
          </div>
          {expanded.availability && (
            <div className="flex flex-col gap-2">
              <label className="cursor-pointer flex items-center gap-2">
                <input type="checkbox" className="form-checkbox text-blue-500" />
                En stock
              </label>
              <label className="cursor-pointer flex items-center gap-2">
                <input type="checkbox" className="form-checkbox text-blue-500" />
                Épuisé
              </label>
            </div>
          )}
        </div>

        {/* Catégories */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-lg mb-2">Catégories</h2>
            <button onClick={() => toggleExpansion("categories")} className="text-blue-500">
              {expanded.categories ? "▼" : "▶️"}
            </button>
          </div>
          {expanded.categories && (
            <ul className="space-y-2">
              {['T-shirts', 'Pantalons', 'Chaussures', 'Accessoires'].map((cat, index) => (
                <li key={index} className="cursor-pointer hover:text-blue-500 transition-all">
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Couleur */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-lg mb-2">Couleur</h2>
            <button onClick={() => toggleExpansion("color")} className="text-blue-500">
              {expanded.color ? "▼" : "▶️"}
            </button>
          </div>
          {expanded.color && (
            <div className="flex gap-2">
              {['Red', 'Blue', 'Green', 'Black'].map((color, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full bg-${color.toLowerCase()}-500`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Plage de prix */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-lg mb-2">Plage de prix</h2>
            <button onClick={() => toggleExpansion("price")} className="text-blue-500">
              {expanded.price ? "▼" : "▶️"}
            </button>
          </div>
          {expanded.price && (
            <>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                className="w-full h-2 bg-blue-200 rounded-full"
              />
              <div className="flex justify-between text-sm mt-2">
                <span>0</span>
                <span>100</span>
              </div>
            </>
          )}
        </div>

        {/* Collections */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-lg mb-2">Collections</h2>
            <button onClick={() => toggleExpansion("collection")} className="text-blue-500">
              {expanded.collection ? "▼" : "▶️"}
            </button>
          </div>
          {expanded.collection && (
            <ul className="space-y-2">
              {['Été', 'Hiver', 'Nouveautés'].map((collection, index) => (
                <li key={index} className="cursor-pointer hover:text-blue-500 transition-all">
                  {collection}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tags */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-lg mb-2">Tags</h2>
            <button onClick={() => toggleExpansion("tags")} className="text-blue-500">
              {expanded.tags ? "▼" : "▶️"}
            </button>
          </div>
          {expanded.tags && (
            <div className="flex flex-wrap gap-2">
              {['Promotion', 'Best Seller', 'Nouveauté'].map((tag, index) => (
                <button
                  key={index}
                  className="border px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Évaluation */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-lg mb-2">Évaluation</h2>
            <button onClick={() => toggleExpansion("rating")} className="text-blue-500">
              {expanded.rating ? "▼" : "▶️"}
            </button>
          </div>
          {expanded.rating && (
            <div className="flex gap-2">
              {['1', '2', '3', '4', '5'].map((rating, index) => (
                <button
                  key={index}
                  className="border px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                >
                  {rating}★
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
