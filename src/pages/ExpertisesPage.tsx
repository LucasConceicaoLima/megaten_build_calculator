import React from "react";
import { Card, CardContent, Divider } from "@mui/material";
import ExpertiseForm from "../components/expertise/ExpertiseForm";
import ChainExpertiseForm from "../components/expertise/ChainExpertiseForm";
import ExpertiseCapForm from "../components/expertise/ExpertiseCapForm";

const ExpertisesPage: React.FC = () => {
  return (
    <Card sx={{ m: 3, p: 5, borderRadius: 5 }}>
      <CardContent>
        <ExpertiseForm />
        <Divider sx={{ my: 3 }} />
        <ChainExpertiseForm />
        <Divider sx={{ my: 3 }} />
        <ExpertiseCapForm />
      </CardContent>
    </Card>
  );
};

export default ExpertisesPage;
