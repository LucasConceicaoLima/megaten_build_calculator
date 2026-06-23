import { useForm, Controller } from "react-hook-form";
import { Box, MenuItem, TextField, Slider, Typography, Switch } from "@mui/material";
import { useEffect } from "react";
import MoonPhaseSelect from "./MoonPhaseSelect";
import NumberSpinner from "../NumberSpinner";
import type { PlayerForm } from "../../types/PlayerForm";
import { usePlayerStats } from "../../context/PlayerStatsContext";

export default function CharacterForm() {
  const { baseStats, updateBaseStat } = usePlayerStats();

  const { control, watch } = useForm<PlayerForm>({
    defaultValues: {
      level: baseStats.level,
      sex: baseStats.sex,
      alignment: baseStats.alignment,
      strength: baseStats.strength,
      magic: baseStats.magic,
      vitality: baseStats.vitality,
      intelligence: baseStats.intelligence,
      speed: baseStats.speed,
      luck: baseStats.luck,
      currentHpPercent: baseStats.currentHpPercent,
      moonPhase: baseStats.moonPhase,
      timePeriod: baseStats.timePeriod,
      digitalizeActive: baseStats.digitalizeActive,
    },
  });

  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (!name) return;

      const key = name as keyof PlayerForm;
      const value = values[key];

      if (value === undefined) return;

      updateBaseStat(
        key,
        value
      );
    });

    return () => subscription.unsubscribe();
  }, [watch, updateBaseStat]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 7,
      }}
    >

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Controller
          name="level"
          control={control}
          render={({ field }) => (
            <NumberSpinner
              size="small"
              label="Level"
              min={1}
              max={99}
              value={field.value ?? 1}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="sex"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Sex"
              fullWidth
              sx={{ mt: 1.5 }}
            >
              <MenuItem value="m">Male</MenuItem>
              <MenuItem value="f">Female</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="alignment"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Alignment"
              fullWidth
              sx={{ mt: 1.5 }}
            >
              <MenuItem value="law">Law</MenuItem>
              <MenuItem value="neutral">Neutral</MenuItem>
              <MenuItem value="chaos">Chaos</MenuItem>
            </TextField>
          )}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {(["strength", "magic", "vitality"] as const).map((attr) => (
          <Controller
            key={attr}
            name={attr}
            control={control}
            render={({ field }) => (
              <NumberSpinner
                size="small"
                label={attr.charAt(0).toUpperCase() + attr.slice(1)}
                min={1}
                max={99}
                value={field.value ?? 1}
                onChange={field.onChange}
              />
            )}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {(["intelligence", "speed", "luck"] as const).map((attr) => (
          <Controller
            key={attr}
            name={attr}
            control={control}
            render={({ field }) => (
              <NumberSpinner
                size="small"
                label={attr.charAt(0).toUpperCase() + attr.slice(1)}
                min={1}
                max={99}
                value={field.value ?? 1}
                onChange={field.onChange}
              />
            )}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Controller
          name="currentHpPercent"
          control={control}
          render={({ field }) => (
            <Box sx={{ px: 1 }}>
              <Typography gutterBottom>
                Current HP: {field.value ?? 100}%
              </Typography>

              <Slider
                value={field.value ?? 100}
                min={1}
                max={100}
                step={1}
                valueLabelDisplay="auto"
                onChange={(_, value) => field.onChange(value)}
              />
            </Box>
          )}
        />

        <MoonPhaseSelect control={control} />

        <Controller
          name="timePeriod"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Time"
              fullWidth
            >
              <MenuItem value="day">
                06:00 - 17:59 (Daytime)
              </MenuItem>

              <MenuItem value="night">
                18:00 - 05:59 (Nighttime)
              </MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="digitalizeActive"
          control={control}
          render={({ field }) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1,
              }}
            >
              <Typography>Digitalize</Typography>

              <Switch
                checked={field.value ?? false}
                onChange={(_, checked) => field.onChange(checked)}
              />
            </Box>
          )}
        />

      </Box>
    </Box>
  );
}