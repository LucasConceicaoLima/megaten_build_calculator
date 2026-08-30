import { useState, useEffect } from "react";
import type { Tarot } from "../types/Tarot";

const useTarots = () => {
  const [tarots, setTarots] = useState<Tarot[]>([]);
  const [loadingTarots, setLoadingTarots] = useState(true);
  const [errorTarots, setErrorTarots] = useState("");

  const fetchTarots = async () => {
    try {
      setLoadingTarots(true);
      setErrorTarots("");

      const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

      if (!apiUrl) {
        throw new Error("VITE_API_URL is not defined");
      }

      const headers = new Headers();
      headers.set("Content-Type", "application/json");

      const response = await fetch(`${apiUrl}/tarots`, {
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

  return {
    tarots,
    loadingTarots,
    errorTarots,
    fetchTarots,
  };
};

export default useTarots;