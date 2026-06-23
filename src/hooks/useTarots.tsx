import { useState, useEffect } from "react";
import type { Tarot } from "../types/Tarot";

const useTarots = () => {
  const [tarots, setTarots] = useState<Tarot[]>([]);
  const [loadingTarots, setLoadingTarots] = useState(true);
  const [errorTarots, setErrorTarots] = useState("");

  // const apiUrl = import.meta.env.VITE_API_URL;
  // const username = import.meta.env.VITE_USERNAME;
  // const password = import.meta.env.VITE_PASSWORD;

  const fetchTarots = async () => {
    try {
      const headers = new Headers();
      //headers.set('Authorization', 'Basic ' + btoa(${username}:${password}));
      headers.set("Content-Type", "application/json");

      const response = await fetch(`http://localhost:3000/tarots`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data: Tarot[] = await response.json();
      setTarots(data);
    } catch (error: any) {
      setErrorTarots(error.message);
    } finally {
      setLoadingTarots(false);
    }
  };

  useEffect(() => {
    fetchTarots();
  }, []);

  return { tarots, loadingTarots, errorTarots, fetchTarots };
};

export default useTarots;