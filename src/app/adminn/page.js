
"use client";
import { useState } from "react";
import styled from "styled-components";
import ListeProduit from "./composants/ListeProduits";
import AjoutProduit from "./composants/AjoutProduits";
import ProfilAdmin from "./composants/ProfilAdmin";

// const PageContainer = styled.div`
//   display: flex;
//   height: 100vh;
// `;

const Sidebar = styled.div`
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
`;

const Navbar = styled.div`
  position: fixed;
  top: 0;
  left: 250px;
  width: calc(100% - 250px);
  height: 60px;
  background: #34495e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 80px 20px 20px;
  margin-left: 250px;
  width: calc(100% - 250px);
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
  padding: 10px;
  width: 100%;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState("liste");

  return (
    <>
      <Sidebar>
        <h2>Dashboard</h2>
        <Button onClick={() => setSelectedTab("liste")}>Liste des Produits</Button>
        <Button onClick={() => setSelectedTab("ajout")}>Ajouter un Produit</Button>
        <Button onClick={() => setSelectedTab("profil")}>Profil Admin</Button>
      </Sidebar>

      <Navbar>
        <h2>Tableau de Bord Admin</h2>
        <ProfileButton onClick={() => setSelectedTab("profil")}>Mon Profil</ProfileButton>
      </Navbar>

      <Content>
        {selectedTab === "liste" && <ListeProduit />}
        {selectedTab === "ajout" && <AjoutProduit />}
        {selectedTab === "profil" && <ProfilAdmin />}
      </Content>
    </>
  );
};

export default AdminPage;
