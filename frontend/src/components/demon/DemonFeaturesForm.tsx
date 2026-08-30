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

import useEpitaph from "../../hooks/useEpitaph";
import { usePlayerStats } from "../../context/PlayerStatsContext";

import type { Epitaph } from "../../types/Epitaph";
import type { PlayerStats } from "../../types/PlayerStats";

type DemonFeaturesFormValues = {
  feature1: string | null;
  feature2: string | null;
  feature3: string | null;
  feature4: string | null;
};

const fields = [
  { name: "feature1", label: "Feature 1" },
  { name: "feature2", label: "Feature 2" },
  { name: "feature3", label: "Feature 3" },
  { name: "feature4", label: "Feature 4" },
] satisfies {
  name: keyof DemonFeaturesFormValues;
  label: string;
}[];

export function DemonFeaturesForm() {
  const { epitaph } = useEpitaph();
  const { setBonusStats } = usePlayerStats();

  const { control, watch, getValues } =
    useForm<DemonFeaturesFormValues>({
      defaultValues: {
        feature1: null,
        feature2: null,
        feature3: null,
        feature4: null,
      },
    });

  const values = watch();

  const calculateEpitaphStats = (
    values: DemonFeaturesFormValues
  ): Partial<PlayerStats> => {
    const stats: Partial<PlayerStats> = {};

    Object.values(values).forEach((id) => {
      if (!id) return;

      const epitaphs = epitaph?.find(
        (e: Epitaph) => e.id === id
      );

      if (!epitaphs) return;

      Object.entries(epitaphs).forEach(
        ([key, value]) => {
          if (typeof value === "number") {
            (stats as any)[key] =
              ((stats as any)[key] || 0) +
              value;
          }
        }
      );
    });

    return stats;
  };

  const handleChange = (
    fieldName: keyof DemonFeaturesFormValues,
    value: Epitaph | null,
    fieldOnChange: (
      value: string | null
    ) => void
  ) => {
    const id = value?.id ?? null;

    fieldOnChange(id);

    const updatedValues: DemonFeaturesFormValues =
      {
        ...getValues(),
        [fieldName]: id,
      };

    const stats =
      calculateEpitaphStats(updatedValues);

    setBonusStats("epitaph", stats);
  };

  const buildTooltipContent = (
    obj: Epitaph
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
        Demon Features / Epitaphs
      </Typography>

      <Grid container spacing={2}>
        {fields.map(({ name, label }) => (
          <Grid
            key={name}
            size={{
              xs: 12,
              sm: 6,
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
                  epitaph ?? []
                )
                  .filter(
                    (epitaph) =>
                      epitaph.id ===
                        field.value ||
                      !selectedIds.includes(
                        epitaph.id
                      )
                  )
                  .sort((a, b) =>
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
                      epitaph?.find(
                        (e: Epitaph) =>
                          e.id ===
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
                    renderOption={(
                      props,
                      option
                    ) => {
                      const {
                        key,
                        ...optionProps
                      } = props;

                      return (
                        <Tooltip
                          key={key}
                          title={buildTooltipContent(
                            option
                          )}
                          placement="right"
                        >
                          <li
                            {...optionProps}
                          >
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