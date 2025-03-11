'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Nav from '../components/Nav';

const Container = styled.div`
  background-color:rgb(243, 244, 246);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #374151;
  margin-bottom: 16px;
`;

const InfoText = styled.p`
  font-size: 18px;
  color: #1f2937;
  margin-bottom: 12px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 18px;
`;

const Button = styled.button`
  width: 30%;
  background: white;
  border: 2px solid #5e5e5e;
  color: #5e5e5e;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #e5e7eb;
    transform: scale(1.05);
  }
`;

export default function Profil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token non trouvé, vous devez être connecté.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://backendclothstore.onrender.com/api/utilisateurs/profil', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Impossible de récupérer le profil');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <Container><InfoText>Chargement...</InfoText></Container>;
  }

  if (error) {
    return <Container><ErrorText>{`Erreur: ${error}`}</ErrorText></Container>;
  }

  if (!user) {
    return <Container><InfoText>Aucun utilisateur trouvé.</InfoText></Container>;
  }

  return (
    <Container>
      <Nav />
      <ProfileCard>
        <Title>Profil de {user.nom} {user.prenom}</Title>
        <InfoText><strong>Email :</strong> {user.email}</InfoText>
        <Button>Modifier </Button>
      </ProfileCard>
    </Container>
  );
}
