import { useState, useEffect } from "react";
import type { DemonForce } from "../types/DemonForce";

const useDemonForce = () => {
  const [demonForce, setDemonForce] = useState<DemonForce[]>([]);
  const [loadingDemonForce, setLoadingDemonForce] = useState(true);
  const [errorDemonForce, setErrorDemonForce] = useState("");

  const fetchDemonForce = async () => {
    try {
      setLoadingDemonForce(true);
      setErrorDemonForce("");

      const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

      if (!apiUrl) {
        throw new Error("VITE_API_URL is not defined");
      }

      const headers = new Headers();
      headers.set("Content-Type", "application/json");

      const response = await fetch(`${apiUrl}/demon-force`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data: DemonForce[] = await response.json();
      setDemonForce(data);
    } catch (error: any) {
      setErrorDemonForce(error.message);
    } finally {
      setLoadingDemonForce(false);
    }
  };

  useEffect(() => {
    fetchDemonForce();
  }, []);

  return {
    demonForce,
    loadingDemonForce,
    errorDemonForce,
    fetchDemonForce,
  };
};

export default useDemonForce;