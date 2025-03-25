"use client";
import { useState } from "react";
import styled from "styled-components";
import ListeProduit from "./composants/ListeProduits";
import AjoutProduit from "./composants/AjoutProduits";
import ProfilAdmin from "./composants/ProfilAdmin";
import {FiUser} from 'react-icons/fi'
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

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  background: white;
  color: black;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 150px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ProfileMenuItem = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 14px;
  padding: 10px;
  text-align: left;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: #f1f1f1;
  }
`;

const LogoutButton = styled(ProfileMenuItem)`
  &:hover {
    background: #ffe6e6;
  }
`;

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState("liste");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("token");
    window.location.href = "/auth/connexion";
    console.log("Déconnexion...");
  };

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
        <ProfileContainer>
          <ProfileButton onClick={() => setMenuOpen(!menuOpen)}>
             <FiUser size={24} />
          </ProfileButton>
          {menuOpen && (
            <ProfileMenu>
              <ProfileMenuItem onClick={() => setSelectedTab("profil")}>
                Voir Profil
              </ProfileMenuItem>
              <LogoutButton onClick={handleLogout}>Déconnexion</LogoutButton>
            </ProfileMenu>
          )}
        </ProfileContainer>
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
