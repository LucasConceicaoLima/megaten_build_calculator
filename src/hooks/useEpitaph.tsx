import { useState, useEffect } from "react";
import type { Epitaph } from "../types/Epitaph";

const useEpitaph = () => {
  const [epitaph, setEpitaph] = useState<Epitaph[]>([]);
  const [loadingEpitaph, setLoadingEpitaph] = useState(true);
  const [errorEpitaph, setErrorEpitaph] = useState("");

  // const apiUrl = import.meta.env.VITE_API_URL;
  // const username = import.meta.env.VITE_USERNAME;
  // const password = import.meta.env.VITE_PASSWORD;

  const fetchEpitaph = async () => {
    try {
      const headers = new Headers();
      //headers.set('Authorization', 'Basic ' + btoa(${username}:${password}));
      headers.set("Content-Type", "application/json");

      const response = await fetch(`http://localhost:3000/epitaph`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data: Epitaph[] = await response.json();
      setEpitaph(data);
    } catch (error: any) {
      setErrorEpitaph(error.message);
    } finally {
      setLoadingEpitaph(false);
    }
  };

  useEffect(() => {
    fetchEpitaph();
  }, []);

  return { epitaph, loadingEpitaph, errorEpitaph, fetchEpitaph };
};

export default useEpitaph;