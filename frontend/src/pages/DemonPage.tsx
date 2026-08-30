import React from "react";
import { Card, CardContent, Divider } from "@mui/material";
import { DemonSkillsForm } from "../components/demon/DemonSkillsForm";
import { DemonFeaturesForm } from "../components/demon/DemonFeaturesForm";
import { DemonForceForm } from "../components/demon/DemonForceForm";

const DemonPage: React.FC = () => {
  return (
    <Card sx={{ m: 3, p: 5, borderRadius: 5 }}>
      <CardContent>
        <DemonSkillsForm />
        <Divider sx={{ my: 2 }} />
        <DemonFeaturesForm />
        <Divider sx={{ my: 2 }} />
        <DemonForceForm />
      </CardContent>
    </Card>
  );
};

export default DemonPage;