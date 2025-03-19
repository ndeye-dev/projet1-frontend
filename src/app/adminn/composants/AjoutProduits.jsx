

"use client";

import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#2c3e50")};
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#1e2b38")};
  }
`;

const ImagePreview = styled.div`
  margin-top: 10px;
  img {
    max-width: 200px;
    max-height: 200px;
    border-radius: 4px;
  }
`;

const Message = styled.div`
  background-color: ${(props) => (props.$error ? "#f8d7da" : "#d4edda")};
  color: ${(props) => (props.$error ? "#721c24" : "#155724")};
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const AjoutProduit = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData({ ...formData, image: file });

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("image", formData.image);

    // if (formData.image) {
    //   data.append("image", formData.image);
    // }

    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post("http://localhost:5000/api/products/ajouter", data, {
        headers:  {"Content-Type": "application/json"},
        Authorization: `Bearer ${token}`, 
      });

      setMessage("Produit ajouté avec succès !");
      setError(false);

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
      });

      setImagePreview(null);
    } catch (err) {
      setMessage("Erreur lors de l'ajout du produit !");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Ajouter un Produit</Title>

      {message && <Message $error={error}>{message}</Message>} {/* Utilisation de $error pour éviter le warning */}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Nom du Produit</Label>
          <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea id="description" name="description" value={formData.description} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Prix (f)</Label>
          <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="stock">Stock</Label>
          <Input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} min="0" required />
        </FormGroup>

        <FormGroup>
  <Label htmlFor="image">URL de l'image</Label>
  
  <Input 
    type="text" 
    id="image" 
    name="image" 
    value={formData.image} 
    onChange={handleChange} 
  />
  {imagePreview && (
    <ImagePreview>
      <img src={imagePreview} alt="Aperçu de l'image" />
    </ImagePreview>
  )}
</FormGroup>


        <Button type="submit" disabled={loading}>{loading ? "Ajout en cours..." : "Ajouter le Produit"}</Button>
      </Form>
    </Container>
  );
};

export default AjoutProduit;
