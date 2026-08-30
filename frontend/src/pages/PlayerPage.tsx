import React from "react";
import { Card, CardContent, Divider } from "@mui/material";
import CharacterForm from "../components/player/CharacterForm";
import EquipmentForm from "../components/player/EquipmentForm";

const PlayerPage: React.FC = () => {
  return (
    <Card sx={{ m: 3, p: 5, borderRadius: 5 }}>
      <CardContent>
        <CharacterForm />
        <Divider sx={{ my: 2 }} />
        <EquipmentForm />
      </CardContent>
    </Card>
  );
};

export default PlayerPage;