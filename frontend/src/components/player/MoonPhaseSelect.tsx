import { Controller, Control } from "react-hook-form";
import { MenuItem, TextField, Box } from "@mui/material";

import type { PlayerForm } from "../../types/PlayerForm";

export const moonPhases = [
    { value: 0, label: "New Moon (0/8)", icon: "🌑" },
    { value: 1, label: "Waxing Crescent (1/8)", icon: "🌒" },
    { value: 2, label: "Waxing Crescent (2/8)", icon: "🌒" },
    { value: 3, label: "Waxing Crescent (3/8)", icon: "🌒" },
    { value: 4, label: "Half Moon (4/8)", icon: "🌓" },
    { value: 5, label: "Waxing Gibbous (5/8)", icon: "🌔" },
    { value: 6, label: "Waxing Gibbous (6/8)", icon: "🌔" },
    { value: 7, label: "Waxing Gibbous (7/8)", icon: "🌔" },
    { value: 8, label: "Full Moon (8/8)", icon: "🌕" },
    { value: 9, label: "Waning Gibbous (7/8)", icon: "🌖" },
    { value: 10, label: "Waning Gibbous (6/8)", icon: "🌖" },
    { value: 11, label: "Waning Gibbous (5/8)", icon: "🌖" },
    { value: 12, label: "Half Moon (4/8)", icon: "🌗" },
    { value: 13, label: "Waning Crescent (3/8)", icon: "🌘" },
    { value: 14, label: "Waning Crescent (2/8)", icon: "🌘" },
    { value: 15, label: "Waning Crescent (1/8)", icon: "🌘" },
];

interface MoonPhaseSelectProps {
    control: Control<PlayerForm>;
}

export default function MoonPhaseSelect({
    control,
}: MoonPhaseSelectProps) {
    return (
        <Controller
            name="moonPhase"
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    select
                    label="Moon Phase"
                    fullWidth
                >
                    {moonPhases.map((phase) => (
                        <MenuItem
                            key={phase.value}
                            value={phase.value}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                {phase.icon}
                                {" " + phase.label}
                            </Box>
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    );
}