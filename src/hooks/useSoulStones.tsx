import { useState, useEffect } from "react";
import type { SoulStone } from "../types/SoulStone";

const useSoulStones = () => {
  const [soulStones, setSoulStones] = useState<SoulStone[]>([]);
  const [loadingSoulStones, setLoadingSoulStones] = useState(true);
  const [errorSoulStones, setErrorSoulStones] = useState("");

  // const apiUrl = import.meta.env.VITE_API_URL;
  // const username = import.meta.env.VITE_USERNAME;
  // const password = import.meta.env.VITE_PASSWORD;

  const fetchSoulStones = async () => {
    try {
      const headers = new Headers();
      //headers.set('Authorization', 'Basic ' + btoa(${username}:${password}));
      headers.set("Content-Type", "application/json");

      const response = await fetch(`http://localhost:3000/soul-stones`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data: SoulStone[] = await response.json();
      setSoulStones(data);
    } catch (error: any) {
      setErrorSoulStones(error.message);
    } finally {
      setLoadingSoulStones(false);
    }
  };

  useEffect(() => {
    fetchSoulStones();
  }, []);

  return { soulStones, loadingSoulStones, errorSoulStones, fetchSoulStones };
};

export default useSoulStones;