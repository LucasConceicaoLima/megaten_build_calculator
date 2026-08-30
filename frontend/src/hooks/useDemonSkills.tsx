import { useState, useEffect } from "react";
import { DemonSkills } from "../types/DemonSkills";

const useDemonSkills = () => {
  const [demonSkills, setDemonSkills] = useState<DemonSkills[]>([]);
  const [loadingDemonSkills, setLoadingDemonSkills] = useState(true);
  const [errorDemonSkills, setErrorDemonSkills] = useState("");

  const fetchDemonSkills = async () => {
    try {
      setLoadingDemonSkills(true);
      setErrorDemonSkills("");

      const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

      if (!apiUrl) {
        throw new Error("VITE_API_URL is not defined");
      }

      const headers = new Headers();
      headers.set("Content-Type", "application/json");

      const response = await fetch(`${apiUrl}/demon-skills`, {
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

  return {
    demonSkills,
    loadingDemonSkills,
    errorDemonSkills,
    fetchDemonSkills,
  };
};

export default useDemonSkills;