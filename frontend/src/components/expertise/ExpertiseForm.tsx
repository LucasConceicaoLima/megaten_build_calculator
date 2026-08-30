import { useForm, Controller, useWatch } from 'react-hook-form';
import { Grid } from '@mui/material';
import type { Expertise } from '../../types/Expertise';
import { formatLabel } from '../../utils/functions';
import { useExpertise } from '../../context/ExpertiseContext';
import { useEffect } from 'react';
import NumberSpinner from '../NumberSpinner';

export default function ExpertiseForm() {
    const initialExpertiseValues: Expertise = {
        attack: { min: 0.0, max: 10.0 },
        spin: { min: 0.0, max: 7.0 },
        rush: { min: 0.0, max: 7.0 },
        shot: { min: 0.0, max: 9.0 },
        rapid: { min: 0.0, max: 10.0 },
        guard: { min: 0.0, max: 0.0 },
        counter: { min: 0.0, max: 0.0 },
        dodge: { min: 0.0, max: 0.0 },
        curativeMagic: { min: 0.0, max: 10.0 },
        destructionMagic: { min: 0.0, max: 10.0 },
        supportMagic: { min: 0.0, max: 8.0 },
        curseMagic: { min: 0.0, max: 8.0 },
        talk: { min: 0.0, max: 0.0 },
        threaten: { min: 0.0, max: 0.0 },
        taunt: { min: 0.0, max: 0.0 },
        summon: { min: 0.0, max: 6.0 },
        occultism: { min: 0.0, max: 7.0 },
        fusion: { min: 0.0, max: 10.0 },
        demonology: { min: 0.0, max: 7.0 },
        weaponKnowledge: { min: 0.0, max: 9.0 },
        survivalTechniques: { min: 0.0, max: 7.0 },
        psychology: { min: 0.0, max: 10.0 },
        medicalSciences: { min: 0.0, max: 6.0 },
        crushingTechnique: { min: 0.0, max: 10.0 },
        mineralogy: { min: 0.0, max: 10.0 },
        biology: { min: 0.0, max: 7.0 },
        botany: { min: 0.0, max: 0.0 },
        mechanicalEngineering: { min: 0.0, max: 0.0 },
        informationEngineering: { min: 0.0, max: 0.0 },
        blades: { min: 0.0, max: 10.0 },
        sketching: { min: 0.0, max: 8.0 },
        creation: { min: 0.0, max: 5.0 },
        crafts: { min: 0.0, max: 10.0 },
        firearmsKnowledge: { min: 0.0, max: 0.0 },
        gunKnowledge: { min: 0.0, max: 9.0 },
        pursuit: { min: 0.0, max: 9.0 },
        magicControl: { min: 0.0, max: 9.0 },
        bless: { min: 0.0, max: 9.0 },
    };

    const { control } = useForm<Record<keyof Expertise, number>>({
        defaultValues: Object.fromEntries(
            Object.keys(initialExpertiseValues).map((key) => [key, 0])
        ) as Record<keyof Expertise, number>,
    });

    const { setExpertise } = useExpertise();
    const watchedExpertise = useWatch({ control });

    useEffect(() => {
        setExpertise(
            Object.fromEntries(
                Object.entries(watchedExpertise).map(([k, v]) => [k, v ?? 0])
            ) as Record<keyof Expertise, number>
        );
    }, [watchedExpertise]);

    return (
        <Grid container spacing={2}>
            {(Object.keys(initialExpertiseValues) as (keyof Expertise)[]).map(
                (fieldName) => {
                    const { min, max } = initialExpertiseValues[fieldName];
                    const disabled = min === 0 && max === 0;

                    return (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={fieldName}>
                            <Controller
                                name={fieldName}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <NumberSpinner
                                        {...field}
                                        size="small"
                                        label={formatLabel(fieldName)}
                                        min={min}
                                        max={max}
                                        step={0.1}
                                        disabled={disabled}
                                        error={!!fieldState.error}
                                        value={field.value ?? 0}
                                        onValueChange={(value) => field.onChange(value)}
                                    />
                                )}
                            />
                        </Grid>
                    );
                }
            )}
        </Grid>
    );
}
