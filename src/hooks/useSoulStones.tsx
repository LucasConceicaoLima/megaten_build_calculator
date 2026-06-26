import { useState, useEffect } from "react";
import type { SoulStone } from "../types/SoulStone";

const useSoulStones = () => {
  const [soulStones, setSoulStones] = useState<SoulStone[]>([]);
  const [loadingSoulStones, setLoadingSoulStones] = useState(true);
  const [errorSoulStones, setErrorSoulStones] = useState("");

  const fetchSoulStones = async () => {
    try {
      setLoadingSoulStones(true);
      setErrorSoulStones("");

      const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

      if (!apiUrl) {
        throw new Error("VITE_API_URL is not defined");
      }

      const headers = new Headers();
      headers.set("Content-Type", "application/json");

      const response = await fetch(`${apiUrl}/soul-stones`, {
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

  return {
    soulStones,
    loadingSoulStones,
    errorSoulStones,
    fetchSoulStones,
  };
};

export default useSoulStones;