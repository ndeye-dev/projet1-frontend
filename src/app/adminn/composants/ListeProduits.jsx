"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
  padding: 0 15px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`;

const ProductCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductImage = styled.img`
  max-width: 120px;
  max-height: 120px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 20px;
`;

const Button = styled.button`

  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  }
`;

const LoadingMessage = styled.div`
  color: #3498db;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 20px;
`;

const NoProductsMessage = styled.div`
  text-align: center;
  color: #7f8c8d;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const ListProduit = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des produits.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <Title>Liste des Produits</Title>
      {loading && <LoadingMessage>Chargement...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {products.length === 0 && !loading && <NoProductsMessage>Aucun produit disponible.</NoProductsMessage>}
      {products.map((product) => (
        <ProductCard key={product._id}>
          <ProductInfo>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Prix:</strong> {product.price} Fcfa</p>
            <p><strong>Stock:</strong> {product.stock}</p>
          </ProductInfo>
          {product.image ? (
            <ProductImage src={product.image} alt={product.name} />
          ) : (
            <ProductImage src="https://via.placeholder.com/120" alt="Image par défaut" />
          )}
          <Button>Voir Détails</Button>
        </ProductCard>
      ))}
    </Container>
  );
};

export default ListProduit;
