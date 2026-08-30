import React from "react";
import { Card, CardContent, Divider } from "@mui/material";
import Quests from "../components/world/Quests";
import Compendium from "../components/world/Compendium";
import ChamberOfLife from "../components/world/ChamberLife";

const WorldPage: React.FC = () => {
  return (
    <Card sx={{ m: 3, p: 5, borderRadius: 5 }}>
      <CardContent>
        <Quests />
        <Divider sx={{ my: 2 }} />
        <Compendium />
        <Divider sx={{ my: 2 }} />
        <ChamberOfLife />
      </CardContent>
    </Card>
  );
};

export default WorldPage;