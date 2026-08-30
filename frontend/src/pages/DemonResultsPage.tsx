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

import { useDemonStats } from "../context/DemonStatsContext";

import { formatLabel2 } from "../utils/functions";

type DemonCategory = {
  title: string;
  subtitle: string;
  keys: string[];
};

const demonCategories: DemonCategory[] = [
  {
    title: "Base Stats",
    subtitle: "Primary demon attributes",
    keys: [
      "strength",
      "magic",
      "vitality",
      "intelligence",
      "speed",
      "luck",
    ],
  },

  {
    title: "Combat",
    subtitle: "Attack and offensive stats",
    keys: [
      "attack",
      "rush",
      "shot",
      "spell",
      "support",
    ],
  },

  {
    title: "Defense",
    subtitle: "Protection and mitigation",
    keys: [
      "pDef",
      "mDef",
      "criticalDefense",
    ],
  },

  {
    title: "Special",
    subtitle: "Advanced demon effects",
    keys: [
      "critical",
      "lbChance",
      "lbPower",
      "taChance",
      "taPower",
    ],
  },
];

const DemonResultsPage: React.FC = () => {
  const { stats } = useDemonStats();

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
              Demon Results
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              mt={0.5}
            >
              Consolidated overview of all demon statistics
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {demonCategories.map((category) => (
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

                  <List disablePadding sx={{ mt: 1 }}>
                    {category.keys.map((key, index) => {
                      const value =
                        stats[key as keyof typeof stats];

                      if (
                        value === undefined ||
                        value === null ||
                        value === 0
                      ) {
                        return null;
                      }

                      return (
                        <React.Fragment key={key}>
                          <ListItem
                            disableGutters
                            sx={{
                              py: 1.5,
                            }}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {formatLabel2(key)}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant="subtitle1"
                                  fontWeight={700}
                                  color="text.primary"
                                  sx={{ mt: 0.5 }}
                                >
                                  {value}
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

export default DemonResultsPage;