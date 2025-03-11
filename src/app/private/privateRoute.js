//src/app/private/privateRoute.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Vérifie si un token est présent

    if (!token) {
      router.push('/auth/connexion'); // Redirige vers la page de connexion si pas de token
    } else {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  return isAuthenticated ? children : null;
}
