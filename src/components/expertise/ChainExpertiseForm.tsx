import { useForm, Controller } from 'react-hook-form';
import { Grid } from '@mui/material';
import type { ChainExpertise } from '../../types/ChainExpertise';
import { formatLabel } from '../../utils/functions';
import { chainExpertiseRules } from '../../utils/chainExpertiseRules';
import { useEffect } from 'react';
import { useExpertise } from '../../context/ExpertiseContext';
import NumberSpinner from '../NumberSpinner';

export default function ChainExpertiseForm() {
  const { expertise } = useExpertise();

  const initialChainExpertiseValues: ChainExpertise = {
    masteryOfTheThreeFormsOfLife: 0,
    synthesis: 0,
    demolitionDash: 0,
    mitamaDemonGrowthScience: 0,
    curseOfTheWretched: 0,
    enhancement: 0,
    supportBullet: 0,
    magicBullet: 0,
    sharpshooter: 0,
    vanguard: 0,
    regalPresence: 0,
    berserker: 0,
    ashesAndDust: 0,
    essenceOfMagic: 0,
    sanguineContract: 0,
    swordsmith: 0,
    armsMaker: 0,
    craftsmanship: 0,
  };

  const { control, setValue } = useForm<ChainExpertise>({
    defaultValues: initialChainExpertiseValues,
  });

  useEffect(() => {
    Object.entries(chainExpertiseRules).forEach(([key, { max, formula }]) => {
      const value = formula(expertise);
      setValue(key as keyof ChainExpertise, Math.min(max, +value.toFixed(1)));
    });
  }, [expertise]);

  return (
        <Grid container spacing={2}>
          {(Object.keys(initialChainExpertiseValues) as (keyof ChainExpertise)[]).map(
            (fieldName) => (
              <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={fieldName}>
                <Controller
                  name={fieldName}
                  control={control}
                  render={({ field }) => (
                    <NumberSpinner
                      {...field}
                      size="small"
                      label={formatLabel(fieldName)}
                      min={0}
                      max={99}
                      disabled
                      value={field.value ?? 0}
                    />
                  )}
                />
              </Grid>
            )
          )}
        </Grid>
  );
}