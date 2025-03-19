
"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
`;

const ProfileCard = styled.div`
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #3498db;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: white;
  font-weight: bold;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ProfileName = styled.h3`
  margin: 0;
  font-size: 22px;
  color: #2c3e50;
`;

const ProfileRole = styled.p`
  margin: 0;
  color: #7f8c8d;
  font-size: 16px;
`;

const ProfileEmail = styled.p`
  margin: 0;
  color: #3498db;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #2c3e50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #1e2b38;
  }
`;

const ProfilAdmin = () => {
  const [adminData, setAdminData] = useState(null);  // Initialise adminData avec `null`
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Récupérer le token depuis les cookies (ou localStorage)
    const token = Cookies.get("token");

    if (!token) {
      setError("Veuillez vous connecter.");
      setLoading(false);
      return;
    }

    // Récupérer le profil de l'administrateur depuis l'API
    const fetchAdminProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/utilisateurs/profil", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du profil.");
        }

        const data = await response.json();
        setAdminData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  if (!adminData) return <div>Profil non trouvé.</div>;

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Container>
      <Title>Profil Administrateur</Title>

      <ProfileCard>
        <ProfileHeader>
          <ProfileImage>{getInitials(adminData.nom)}</ProfileImage>
          <ProfileInfo>
            <ProfileName>{adminData.nom}</ProfileName>
            <ProfileRole>{adminData.role}</ProfileRole>
            <ProfileEmail>{adminData.email}</ProfileEmail>
          </ProfileInfo>
        </ProfileHeader>

        <div>
          <p><strong>Téléphone:</strong> {adminData.telephone}</p>
          <p><strong>Adresse:</strong> {adminData.adresse}</p>
          <p><strong>Date d'inscription:</strong> {adminData.dateInscription}</p>
        </div>

        <Button onClick={() => alert("Modifier le profil")}>Modifier le Profil</Button>
      </ProfileCard>
    </Container>
  );
};

export default ProfilAdmin;
