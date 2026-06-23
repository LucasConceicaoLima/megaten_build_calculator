import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { useMemo } from 'react';
import { expertiseSources } from '../../context/ExpertiseSources';

type FormValues = Record<string, boolean>;

export default function ExpertiseCapForm() {
  const { control } = useForm<FormValues>({
    defaultValues: Object.fromEntries(
      expertiseSources.map((s) => [s.id, false])
    ),
  });

  const values = useWatch({ control });

  const totalExpertise = useMemo(() => {
    return expertiseSources.reduce((sum, source) => {
      return values?.[source.id] ? sum + source.points : sum;
    }, 0);
  }, [values]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Expertise Sources
      </Typography>

      <Grid container spacing={2}>
        {expertiseSources.map((source) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={source.id}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Controller
                name={source.id}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={!!field.value} />}
                    label={
                      <Box>
                        <Typography variant="body2">
                          {source.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          +{source.points.toLocaleString()} expertise
                        </Typography>
                      </Box>
                    }
                  />
                )}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={3}>
        <Typography variant="subtitle1">
          Total Expertise Obtained:
        </Typography>
        <Typography variant="h5" color="primary">
          {totalExpertise.toLocaleString()} pts
        </Typography>
      </Box>
    </Box>
  );
}
