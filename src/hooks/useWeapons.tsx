import { useState, useEffect } from "react";
import type { Weapon } from "../types/Weapon";

const useWeapons = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loadingWeapons, setLoadingWeapons] = useState(true);
  const [errorWeapons, setErrorWeapons] = useState("");

  // const apiUrl = import.meta.env.VITE_API_URL;
  // const username = import.meta.env.VITE_USERNAME;
  // const password = import.meta.env.VITE_PASSWORD;

  const fetchWeapons = async () => {
    try {
      const headers = new Headers();
      //headers.set('Authorization', 'Basic ' + btoa(${username}:${password}));
      headers.set("Content-Type", "application/json");

      const response = await fetch(`http://localhost:3000/weapons`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data: Weapon[] = await response.json();
      setWeapons(data);
    } catch (error: any) {
      setErrorWeapons(error.message);
    } finally {
      setLoadingWeapons(false);
    }
  };

  useEffect(() => {
    fetchWeapons();
  }, []);

  return { weapons, loadingWeapons, errorWeapons, fetchWeapons };
};

export default useWeapons;