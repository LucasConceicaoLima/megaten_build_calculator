import { Controller, useForm } from "react-hook-form";
import {
  Autocomplete,
  Grid,
  TextField,
  Typography,
  Tooltip,
  Box,
  Divider,
} from "@mui/material";

import useDemonForce from "../../hooks/useDemonForce";
import { usePlayerStats } from "../../context/PlayerStatsContext";

import type { DemonForce } from "../../types/DemonForce";
import type { PlayerStats } from "../../types/PlayerStats";

type DemonForceFormValues = {
  skill1: string | null;
  skill2: string | null;
  skill3: string | null;
  skill4: string | null;
  skill5: string | null;
  skill6: string | null;
  skill7: string | null;
  skill8: string | null;
};

const fields = [
  { name: "skill1", label: "Slot 1" },
  { name: "skill2", label: "Slot 2" },
  { name: "skill3", label: "Slot 3" },
  { name: "skill4", label: "Slot 4" },
  { name: "skill5", label: "Slot 5" },
  { name: "skill6", label: "Slot 6" },
  { name: "skill7", label: "Slot 7" },
  { name: "skill8", label: "Slot 8" },
] satisfies {
  name: keyof DemonForceFormValues;
  label: string;
}[];

export function DemonForceForm() {
  const { demonForce } = useDemonForce();
  const { setBonusStats } = usePlayerStats();

  const {
    control,
    watch,
    getValues,
  } = useForm<DemonForceFormValues>({
    defaultValues: {
      skill1: null,
      skill2: null,
      skill3: null,
      skill4: null,
      skill5: null,
      skill6: null,
      skill7: null,
      skill8: null,
    },
  });

  const values = watch();

  const calculateDemonStats = (
    values: DemonForceFormValues
  ): Partial<PlayerStats> => {
    const stats: Partial<PlayerStats> = {};

    Object.values(values).forEach((id) => {
      if (!id) return;

      const demon = demonForce?.find(
        (d) => d.id === id
      );

      if (!demon) return;

      Object.entries(demon).forEach(([key, value]) => {
        if (typeof value === "number") {
          (stats as any)[key] =
            ((stats as any)[key] || 0) + value;
        }
      });
    });

    return stats;
  };

  const handleChange = (
    fieldName: keyof DemonForceFormValues,
    value: DemonForce | null,
    fieldOnChange: (value: string | null) => void
  ) => {
    const id = value?.id ?? null;

    fieldOnChange(id);

    const updatedValues: DemonForceFormValues = {
      ...getValues(),
      [fieldName]: id,
    };

    const stats =
      calculateDemonStats(updatedValues);

    setBonusStats("demonForce", stats);
  };

  const buildTooltipContent = (
    obj: DemonForce
  ) => {
    const ignored = ["id", "name"];

    const entries = Object.entries(obj).filter(
      ([k, v]) =>
        !ignored.includes(k) &&
        v !== undefined &&
        v !== null &&
        v !== ""
    );

    const locationEntry = entries.find(
      ([k]) => k === "location"
    );

    const sorted = entries
      .filter(([k]) => k !== "location")
      .sort(([a], [b]) =>
        a.localeCompare(b)
      );

    return (
      <Box>
        {sorted.map(([k, v]) => (
          <Typography
            key={k}
            variant="body2"
          >
            <strong>{k}:</strong>{" "}
            {String(v)}
          </Typography>
        ))}

        {locationEntry && (
          <>
            <Divider sx={{ my: 1 }} />

            <Typography variant="body2">
              <strong>Location:</strong>{" "}
              {String(locationEntry[1])}
            </Typography>
          </>
        )}
      </Box>
    );
  };

  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
      >
        Demon Force
      </Typography>

      <Grid container spacing={2}>
        {fields.map(({ name, label }) => (
          <Grid
            key={name}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Controller
              name={name}
              control={control}
              render={({ field }) => {
                const selectedIds =
                  Object.values(values).filter(
                    Boolean
                  ) as string[];

                const availableOptions = (
                  demonForce ?? []
                )
                  .filter(
                    (df: DemonForce) =>
                      df.id === field.value ||
                      !selectedIds.includes(
                        df.id
                      )
                  )
                  .sort(
                    (
                      a: DemonForce,
                      b: DemonForce
                    ) =>
                      a.name.localeCompare(
                        b.name
                      )
                  );

                return (
                  <Autocomplete
                    options={
                      availableOptions
                    }
                    getOptionLabel={(
                      option
                    ) => option.name}
                    isOptionEqualToValue={(
                      option,
                      value
                    ) =>
                      option.id === value.id
                    }
                    value={
                      demonForce?.find(
                        (df) =>
                          df.id ===
                          field.value
                      ) ?? null
                    }
                    onChange={(_, value) =>
                      handleChange(
                        name,
                        value,
                        field.onChange
                      )
                    }
                    renderOption={(props, option) => {
                      const { key, ...optionProps } = props;

                      return (
                        <Tooltip
                          key={key}
                          title={buildTooltipContent(option)}
                          placement="right"
                        >
                          <li {...optionProps}>
                            {option.name}
                          </li>
                        </Tooltip>
                      );
                    }}
                    renderInput={(
                      params
                    ) => (
                      <TextField
                        {...params}
                        label={label}
                        size="small"
                      />
                    )}
                  />
                );
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}