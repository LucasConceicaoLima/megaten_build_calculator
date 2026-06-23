import React from "react";

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import {
  playerStatsLabels,
  formatStatValue,
} from "../utils/functions";

import { usePlayerStats } from "../context/PlayerStatsContext";

import { PlayerStats } from "../types/PlayerStats";

type StatKey = keyof PlayerStats;

type StatCategory = {
  title: string;
  subtitle: string;
  status: string;
  keys: StatKey[];
};

export const statCategories: StatCategory[] = [
  {
    title: "Character",
    subtitle: "Basic character information",
    status: "Base",
    keys: [
      "level",
      "sex",
      "alignment",
      "move_speed",
    ],
  },

  {
    title: "Main Stats",
    subtitle: "Primary attributes",
    status: "Attributes",
    keys: [
      "strength",
      "magic",
      "vitality",
      "intelligence",
      "speed",
      "luck",
      "hp",
      "mp",
      "HP_regen",
      "MP_regen",
      "HP_regenFlat",
      "MP_regenFlat",
    ],
  },

  {
    title: "Combat",
    subtitle: "Attack and combat power",
    status: "Offensive",
    keys: [
      "attack",
      "shot",
      "rush",
      "spin",
      "clsRng",
      "lngRng",
      "spell",
      "support",
      "slashBoost",
      "thrustBoost",
      "bluntBoost",
      "handgunBoost",
      "penetrateBoost",
      "spreadBoost",
      "fireBoost",
      "iceBoost",
      "electricBoost",
      "forceBoost",
      "expelBoost",
      "deathBoost",
      "mysticBoost",
      "nerveBoost",
      "mindBoost",
      "almightyBoost",
      "weapon_affinity",
    ],
  },

  {
    title: "Defense",
    subtitle: "Defensive capabilities",
    status: "Defensive",
    keys: [
      "pDef",
      "mDef",
      "criticalDefense",
      "slashResist",
      "thrustResist",
      "bluntResist",
      "handgunResist",
      "penetrateResist",
      "spreadResist",
      "fireResist",
      "iceResist",
      "electricResist",
      "forceResist",
      "expelResist",
      "deathResist",
      "mysticResist",
      "nerveResist",
      "mindResist",
      "almightyResist"
    ],
  },

  {
    title: "Critical & Special",
    subtitle: "Critical and advanced combat stats",
    status: "Advanced",
    keys: [
      "critical",
      "finalCriticalCorrection",
      "lbChance",
      "lbPower",
      "lbCap",
      "taChance",
      "taPower",
      "pursuitChance",
      "pursuitPower",
      "slashCap",
      "thrustCap",
      "bluntCap",
      "handgunCap",
      "penetrateCap",
      "spreadCap",
      "fireCap",
      "iceCap",
      "electricCap",
      "forceCap",
      "expelCap",
      "deathCap",
      "mysticCap",
      "nerveCap",
      "mindCap",
      "almightyCap"
    ],
  },
  {
    title: "Resources & Progression",
    subtitle: "Progression and specialization",
    status: "Progression",
    keys: [
      "macca",
      "magnetite",
      "xp",
      "expertise",
      "soulPoints",
      "bethelPoints",
      "digitalizePoints",
      "digitalizeDuration",
    ],
  },
  {
  title: "Race Damage",
  subtitle: "Damage dealt against each race",
  status: "Race Damage",
  keys: [
    "heraldFamilyDmg",
    "deityFamilyDmg",
    "vileFamilyDmg",
    "avianFamilyDmg",
    "megamiFamilyDmg",
    "amatsuFamilyDmg",
    "raptorFamilyDmg",
    "divineFamilyDmg",
    "jakiFamilyDmg",
    "flightFamilyDmg",
    "yomaFamilyDmg",
    "jiraeFamilyDmg",
    "machineFamilyDmg",
    "reaperFamilyDmg",
    "holyFamilyDmg",
    "beastFamilyDmg",
    "fairyFamilyDmg",
    "elementFamilyDmg",
    "fiendFamilyDmg",
    "genmaFamilyDmg",
    "wilderFamilyDmg",
    "snakeFamilyDmg",
    "nightFamilyDmg",
    "avatarFamilyDmg",
    "foulFamilyDmg",
    "bruteFamilyDmg",
    "hauntFamilyDmg",
    "dragonFamilyDmg",
    "fallenFamilyDmg",
    "femmeFamilyDmg",
    "kunitsuFamilyDmg",
    "ladyFamilyDmg",
    "drakeFamilyDmg",
    "kishinFamilyDmg",
    "omegaFamilyDmg",
    "tyrantFamilyDmg",
  ],
},
{
  title: "Race Damage Taken",
  subtitle: "Damage received from each race",
  status: "Race Damage Taken",
  keys: [
    "heraldFamilyDmgTaken",
    "deityFamilyDmgTaken",
    "vileFamilyDmgTaken",
    "avianFamilyDmgTaken",
    "megamiFamilyDmgTaken",
    "amatsuFamilyDmgTaken",
    "raptorFamilyDmgTaken",
    "divineFamilyDmgTaken",
    "jakiFamilyDmgTaken",
    "flightFamilyDmgTaken",
    "yomaFamilyDmgTaken",
    "jiraeFamilyDmgTaken",
    "machineFamilyDmgTaken",
    "reaperFamilyDmgTaken",
    "holyFamilyDmgTaken",
    "beastFamilyDmgTaken",
    "fairyFamilyDmgTaken",
    "elementFamilyDmgTaken",
    "fiendFamilyDmgTaken",
    "genmaFamilyDmgTaken",
    "wilderFamilyDmgTaken",
    "snakeFamilyDmgTaken",
    "nightFamilyDmgTaken",
    "avatarFamilyDmgTaken",
    "foulFamilyDmgTaken",
    "bruteFamilyDmgTaken",
    "hauntFamilyDmgTaken",
    "dragonFamilyDmgTaken",
    "fallenFamilyDmgTaken",
    "femmeFamilyDmgTaken",
    "kunitsuFamilyDmgTaken",
    "ladyFamilyDmgTaken",
    "drakeFamilyDmgTaken",
    "kishinFamilyDmgTaken",
    "omegaFamilyDmgTaken",
    "tyrantFamilyDmgTaken",
  ],
},
];

const PlayerResultsPage: React.FC = () => {
  const { effectiveStats } = usePlayerStats();

  return (
      <Card sx={{ m: 3, p: 3, borderRadius: 5 }}>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={2}
            mb={4}
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
                color="text.primary"
              >
                Player Results
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                mt={0.5}
              >
                Consolidated overview of all final player statistics
              </Typography>
            </Box>

          </Stack>

          <Grid container spacing={3}>
            {statCategories.map((category) => (
              <Grid
                key={category.title}
                size={{
                  xs: 12,
                  md: 6,
                  xl: 3,
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow:
                        "0 12px 24px rgba(15, 23, 42, 0.10)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={1} mb={2}>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                      >
                        {category.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {category.subtitle}
                      </Typography>
                    </Stack>

                
                    <Divider />

                    <List
                      disablePadding
                      sx={{
                        mt: 1,
                      }}
                    >
                      {category.keys.map((key, index) => {
                        const value = effectiveStats[key];

                        if (
                          value === undefined ||
                          value === null
                        ) {
                          return null;
                        }

                        return (
                          <React.Fragment key={key}>
                            <ListItem
                              disableGutters
                              sx={{
                                py: 1.5,
                                alignItems: "flex-start",
                              }}
                            >
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {playerStatsLabels[key]}
                                  </Typography>
                                }
                                secondary={
                                  <Typography
                                    variant="subtitle1"
                                    fontWeight={700}
                                    color="text.primary"
                                    sx={{ mt: 0.5 }}
                                  >
                                    {formatStatValue(
                                      key,
                                      value
                                    )}
                                  </Typography>
                                }
                              />
                            </ListItem>

                            {index <
                              category.keys.length - 1 && (
                              <Divider />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
  );
};

export default PlayerResultsPage;