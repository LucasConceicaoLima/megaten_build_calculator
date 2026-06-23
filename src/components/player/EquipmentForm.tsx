import { useState, useMemo } from "react";
import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Autocomplete,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  Skeleton
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import type { Weapon } from "../../types/Weapon";
import type { PlayerStats } from "../../types/PlayerStats";

import {
  playerStatsLabels,
  demonStatsLabels,
  partyStatsLabels,
  formatLabel
} from "../../utils/functions";

import useWeapons from "../../hooks/useWeapons";
import useTarots from "../../hooks/useTarots";
import usesSoulStones from "../../hooks/useSoulStones";
import { usePlayerStats } from "../../context/PlayerStatsContext";

type SlotValues = {
  slot1: string;
  slot2: string;
  slot3: string;
  tarot: string;
  soulStone: string;
};

const sections = [
  "Weapon", "Head", "Face", "Top", "Bottom", "Shoes",
  "Gloves", "Ring", "Earring", "Necklace", "Talisman", "Extra", "Back", "COMP",
];

const slotLabels: (keyof SlotValues)[] = ["slot1", "slot2", "slot3", "tarot", "soulStone"];

const getLabel = (slotKey: keyof SlotValues) => {
  switch (slotKey) {
    case "slot1": return "Slot 1";
    case "slot2": return "Slot 2";
    case "slot3": return "Slot 3";
    case "tarot": return "Tarot";
    case "soulStone": return "Soul Stone";
  }
};

export default function EquipmentForm() {

  const { weapons, loadingWeapons } = useWeapons();
  const { tarots, loadingTarots } = useTarots();
  const { soulStones, loadingSoulStones } = usesSoulStones();
  const { setBonusStats, baseStats } = usePlayerStats();

  const [matchAllStats, setMatchAllStats] = useState(false);
  const [selectedPlayerStats, setSelectedPlayerStats] = useState<any[]>([]);
  const [selectedDemonStats, setSelectedDemonStats] = useState<any[]>([]);
  const [selectedPartyStats, setSelectedPartyStats] = useState<any[]>([]);

  const loading = loadingWeapons || loadingTarots || loadingSoulStones;

  const [equipment, setEquipment] = useState<Record<string, SlotValues>>(
    sections.reduce((acc, section) => {
      acc[section] = { slot1: "", slot2: "", slot3: "", tarot: "", soulStone: "" };
      return acc;
    }, {} as Record<string, SlotValues>)
  );

  const selectedKeys = useMemo(() => [
    ...selectedPlayerStats,
    ...selectedDemonStats,
    ...selectedPartyStats,
  ].map(s => s.key), [selectedPlayerStats, selectedDemonStats, selectedPartyStats]);

  const matchesFilter = (obj: any) => {
    if (!selectedKeys.length) return true;

    const hasStat = (key: string) => obj[key] !== undefined && obj[key] !== 0;

    return matchAllStats
      ? selectedKeys.every(hasStat)
      : selectedKeys.some(hasStat);
  };

  const filteredWeapons = useMemo(
    () => weapons.filter(matchesFilter),
    [weapons, selectedKeys, matchAllStats]
  );

  const filteredTarots = useMemo(
    () => [...tarots].filter(matchesFilter).sort((a, b) => a.name.localeCompare(b.name)),
    [tarots, selectedKeys, matchAllStats]
  );

  const filteredSoulStones = useMemo(
    () => [...soulStones].filter(matchesFilter).sort((a, b) => a.name.localeCompare(b.name)),
    [soulStones, selectedKeys, matchAllStats]
  );

  const calculateStats = (
    equipment: Record<string, SlotValues>,
    weapons: Weapon[]
  ): Partial<PlayerStats> => {

    const newStats: Partial<PlayerStats> = {};

    Object.entries(equipment).forEach(([section, slots]) => {

      if (section === "Weapon") {
        ["slot1", "slot2", "slot3"].forEach((slotKey) => {
          const weapon = weapons.find(w => w.id === slots[slotKey as keyof SlotValues]);
          if (!weapon) return;

          const slotProp = `s${slotKey[4]}` as "s1" | "s2" | "s3";
          const slotData = weapon[slotProp];

          if (!slotData?.length) return;

          Object.entries(slotData[0]).forEach(([k, v]) => {
            if (typeof v === "number") {
              (newStats as any)[k] = ((newStats as any)[k] || 0) + v;
            }
          });
        });
      }

      if (slots.tarot) {
        const t = tarots.find(t => t.id === slots.tarot);

        if (t && canUseItem(t)) {
          Object.entries(t).forEach(([k, v]) => {
            if (
              typeof v === "number" &&
              !["level"].includes(k)
            ) {
              (newStats as any)[k] =
                ((newStats as any)[k] || 0) + v;
            }
          });
        }
      }

      if (slots.soulStone) {
        const s = soulStones.find(s => s.id === slots.soulStone);

        if (s && canUseItem(s)) {
          Object.entries(s).forEach(([k, v]) => {
            if (
              typeof v === "number" &&
              !["level"].includes(k)
            ) {
              (newStats as any)[k] =
                ((newStats as any)[k] || 0) + v;
            }
          });
        }
      }

    });

    return newStats;
  };

  const handleChange = (section: string, slotKey: keyof SlotValues, value: string) => {

    const updated = {
      ...equipment,
      [section]: {
        ...equipment[section],
        [slotKey]: value,
      },
    };

    setEquipment(updated);

    const newStats = calculateStats(updated, weapons);

    setBonusStats("equipment", newStats);
  };

  const playerOptions = Object.entries(playerStatsLabels).map(([key, label]) => ({ key, label }));
  const demonOptions = Object.entries(demonStatsLabels).map(([key, label]) => ({ key, label }));
  const partyOptions = Object.entries(partyStatsLabels).map(([key, label]) => ({ key, label }));

  const buildTooltipContent = (obj: Record<string, any>) => {

    const ignored = ["id", "name", "part", "level"];

    const formatKey = (key: string) => {
      if (key in playerStatsLabels) {
        return playerStatsLabels[key as keyof typeof playerStatsLabels];
      }

      if (key in demonStatsLabels) {
        return demonStatsLabels[key as keyof typeof demonStatsLabels];
      }

      if (key in partyStatsLabels) {
        return partyStatsLabels[key as keyof typeof partyStatsLabels];
      }

      return formatLabel(key);
    };

    const entries = Object.entries(obj)
      .filter(([k, v]) => !ignored.includes(k) && v !== undefined && v !== "");

    const locationEntry = entries.find(([k]) => k === "location");

    const sorted = entries
      .filter(([k]) => k !== "location")
      .sort(([a], [b]) => a.localeCompare(b));

    return (
      <Box>

        {sorted.map(([k, v]) => (
          <Typography key={k} variant="body2">
            <strong>{formatKey(k)}:</strong> {String(v)}
          </Typography>
        ))}

        {locationEntry && (
          <>
            <Divider sx={{ my: 1 }} />

            <Typography variant="body2">
              <strong>{formatKey(locationEntry[0])}:</strong>{" "}
              {String(locationEntry[1])}
            </Typography>
          </>
        )}

      </Box>
    );
  };

  const getSelectedItem = (
    section: string,
    slotKey: keyof SlotValues
  ) => {
    const selectedId = equipment[section]?.[slotKey];

    if (!selectedId) return null;

    if (
      section === "Weapon" &&
      ["slot1", "slot2", "slot3"].includes(slotKey)
    ) {
      return weapons.find(w => w.id === selectedId);
    }

    if (slotKey === "tarot") {
      return tarots.find(t => t.id === selectedId);
    }

    if (slotKey === "soulStone") {
      return soulStones.find(s => s.id === selectedId);
    }

    return null;
  };

  const canUseItem = (item: any) => {
    if (!item) return false;

    if (!("level" in item)) {
      return true;
    }

    return Number(item.level) <= baseStats.level;
  };

  return (
    <Box sx={{ p: 3 }}>

      <Grid container spacing={2} sx={{ mb: 3 }}>

        <Grid size={{ xs: 4 }}>
          <Autocomplete
            multiple
            options={playerOptions}
            value={selectedPlayerStats}
            onChange={(_, v) => setSelectedPlayerStats(v)}
            getOptionLabel={(o) => o.label}
            renderInput={(p) => <TextField {...p} label="Player Stats" size="small" />}
          />
        </Grid>

        <Grid size={{ xs: 4 }}>
          <Autocomplete
            multiple
            options={demonOptions}
            value={selectedDemonStats}
            onChange={(_, v) => setSelectedDemonStats(v)}
            getOptionLabel={(o) => o.label}
            renderInput={(p) => <TextField {...p} label="Demon Stats" size="small" />}
          />
        </Grid>

        <Grid size={{ xs: 4 }}>
          <Autocomplete
            multiple
            options={partyOptions}
            value={selectedPartyStats}
            onChange={(_, v) => setSelectedPartyStats(v)}
            getOptionLabel={(o) => o.label}
            renderInput={(p) => <TextField {...p} label="Party Stats" size="small" />}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={<Switch checked={matchAllStats} onChange={(e) => setMatchAllStats(e.target.checked)} />}
            label="Match ALL selected stats (AND)"
          />
          <Button
            variant="contained"
            startIcon={<ClearIcon />}
            onClick={() => {
              setSelectedPlayerStats([]);
              setSelectedDemonStats([]);
              setSelectedPartyStats([]);
              setMatchAllStats(false);
            }}
          >
            Clear Selections
          </Button>
        </Grid>
      </Grid>

      {sections.map(section => (
        <Grid container spacing={2} key={section} sx={{ mb: 1 }}>

          <Grid size={{ xs: 2 }}>
            <Typography>{section}</Typography>
          </Grid>

          {slotLabels.map(slotKey => {

            const selectedItem = getSelectedItem(section, slotKey);

            const requiredLevel =
              selectedItem &&
                "level" in selectedItem
                ? selectedItem.level
                : null;

            const hasLevelError =
              requiredLevel !== null &&
              requiredLevel > baseStats.level;

            return (
              <Grid size={{ xs: 2 }} key={slotKey}>
                <FormControl
                  fullWidth
                  size="small"
                  error={hasLevelError}
                >

                  {loading ? (
                    <Skeleton
                      variant="rounded"
                      height={40}
                      animation="wave"
                    />
                  ) : (
                    <>
                      <InputLabel>{getLabel(slotKey)}</InputLabel>

                      <Select
                        value={equipment[section]?.[slotKey] ?? ""}
                        label={getLabel(slotKey)}
                        onChange={(e) =>
                          handleChange(
                            section,
                            slotKey,
                            String(e.target.value)
                          )
                        }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>

                        {section === "Weapon" &&
                          ["slot1", "slot2", "slot3"].includes(slotKey)
                          ? filteredWeapons.map((w) => (
                            <MenuItem
                              value={w.id}
                              key={w.id}
                            >
                              <Tooltip
                                title={buildTooltipContent(w)}
                                placement="right"
                              >
                                <Box sx={{ width: "100%" }}>
                                  {w.name}
                                </Box>
                              </Tooltip>
                            </MenuItem>
                          ))

                          : slotKey === "tarot"
                            ? filteredTarots
                              .filter((t) => {
                                if (section === "COMP") {
                                  return t.part === "COMP";
                                }

                                return t.part !== "COMP";
                              })
                              .map((t) => (
                                <MenuItem
                                  value={t.id}
                                  key={t.id}
                                >
                                  <Tooltip
                                    title={buildTooltipContent(t)}
                                    placement="right"
                                  >
                                    <Box sx={{ width: "100%" }}>
                                      {t.name}
                                    </Box>
                                  </Tooltip>
                                </MenuItem>
                              ))

                            : slotKey === "soulStone"
                              ? filteredSoulStones
                                .filter((s) => {
                                  if (section === "COMP") {
                                    return s.part === "COMP";
                                  }

                                  return (
                                    s.part === section ||
                                    s.part === "All"
                                  );
                                })
                                .map((s) => (
                                  <MenuItem
                                    value={s.id}
                                    key={s.id}
                                  >
                                    <Tooltip
                                      title={buildTooltipContent(s)}
                                      placement="right"
                                    >
                                      <Box sx={{ width: "100%" }}>
                                        {s.name}
                                      </Box>
                                    </Tooltip>
                                  </MenuItem>
                                ))

                              : null}
                      </Select>

                      {hasLevelError && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5 }}
                        >
                          Requires level {requiredLevel}
                        </Typography>
                      )}
                    </>
                  )}

                </FormControl>
              </Grid>
            );
          })}

        </Grid>
      ))}

    </Box>
  );
}