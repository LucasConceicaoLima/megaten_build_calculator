import { useState, useEffect } from "react";
import type { DemonForce } from "../types/DemonForce";

const useDemonForce = () => {
  const [demonForce, setDemonForce] = useState<DemonForce[]>([]);
  const [loadingDemonForce, setLoadingDemonForce] = useState(true);
  const [errorDemonForce, setErrorDemonForce] = useState("");

  // const apiUrl = import.meta.env.VITE_API_URL;
  // const username = import.meta.env.VITE_USERNAME;
  // const password = import.meta.env.VITE_PASSWORD;

  const fetchDemonForce = async () => {
    try {
      const headers = new Headers();
      //headers.set('Authorization', 'Basic ' + btoa(${username}:${password}));
      headers.set("Content-Type", "application/json");

      const response = await fetch(`http://localhost:3000/demon-force`, {
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

  return { demonForce, loadingDemonForce, errorDemonForce, fetchDemonForce };
};

export default useDemonForce;