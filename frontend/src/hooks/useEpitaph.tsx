import { useState, useEffect } from "react";
import type { Epitaph } from "../types/Epitaph";

const useEpitaph = () => {
  const [epitaph, setEpitaph] = useState<Epitaph[]>([]);
  const [loadingEpitaph, setLoadingEpitaph] = useState(true);
  const [errorEpitaph, setErrorEpitaph] = useState("");

  const fetchEpitaph = async () => {
    try {
      setLoadingEpitaph(true);
      setErrorEpitaph("");

      const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

      if (!apiUrl) {
        throw new Error("VITE_API_URL is not defined");
      }

      const headers = new Headers();
      headers.set("Content-Type", "application/json");

      const response = await fetch(`${apiUrl}/epitaph`, {
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

  return {
    epitaph,
    loadingEpitaph,
    errorEpitaph,
    fetchEpitaph,
  };
};

export default useEpitaph;