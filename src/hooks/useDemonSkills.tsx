import { useState, useEffect } from "react";
import { DemonSkills } from "../types/DemonSkills";

const useDemonSkills = () => {
  const [demonSkills, setDemonSkills] = useState<DemonSkills[]>([]);
  const [loadingDemonSkills, setLoadingDemonSkills] = useState(true);
  const [errorDemonSkills, setErrorDemonSkills] = useState("");

  // const apiUrl = import.meta.env.VITE_API_URL;
  // const username = import.meta.env.VITE_USERNAME;
  // const password = import.meta.env.VITE_PASSWORD;

  const fetchDemonSkills = async () => {
    try {
      const headers = new Headers();
      //headers.set('Authorization', 'Basic ' + btoa(${username}:${password}));
      headers.set("Content-Type", "application/json");

      const response = await fetch(`http://localhost:3000/demon-skills`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const data: DemonSkills[] = await response.json();
      setDemonSkills(data);
    } catch (error: any) {
      setErrorDemonSkills(error.message);
    } finally {
      setLoadingDemonSkills(false);
    }
  };

  useEffect(() => {
    fetchDemonSkills();
  }, []);

  return { demonSkills, loadingDemonSkills, errorDemonSkills, fetchDemonSkills };
};

export default useDemonSkills;