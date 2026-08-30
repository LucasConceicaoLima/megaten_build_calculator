import { useState, useEffect } from "react";
import type { Weapon } from "../types/Weapon";

const useWeapons = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loadingWeapons, setLoadingWeapons] = useState(true);
  const [errorWeapons, setErrorWeapons] = useState("");

  const fetchWeapons = async () => {
    try {
      setLoadingWeapons(true);
      setErrorWeapons("");

      const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

      if (!apiUrl) {
        throw new Error("VITE_API_URL is not defined");
      }

      const headers = new Headers();
      headers.set("Content-Type", "application/json");

      const response = await fetch(`${apiUrl}/weapons`, {
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

  return {
    weapons,
    loadingWeapons,
    errorWeapons,
    fetchWeapons,
  };
};

export default useWeapons;