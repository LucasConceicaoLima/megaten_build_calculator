import { Box, Typography } from "@mui/material";
import NumberSpinner from "../../components/NumberSpinner";
import { useCompendium } from "../../context/CompendiumContext";

const getIconPath = (category: string) =>
  `/assets/status/${category.toLowerCase()}_boost.png`;

const Compendium = () => {
  const { value, setValue, totals } = useCompendium();

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Compendium
      </Typography>

      <NumberSpinner
        label="Demons Registered"
        value={value}
        onChange={(val) => setValue(val ?? 0)}
        min={0}
        max={337}
      />

      <Box mt={3}>
        <Typography variant="h6">Base Stats</Typography>
        <Typography>HP: +{totals.HP}</Typography>
        <Typography>MP: +{totals.MP}</Typography>
        <Typography>STR: +{totals.Strength}</Typography>
        <Typography>MAG: +{totals.Magic}</Typography>
        <Typography>VIT: +{totals.Vitality}</Typography>
        <Typography>INT: +{totals.Intelligence}</Typography>
        <Typography>SPD: +{totals.Speed}</Typography>
        <Typography>LUCK: +{totals.Luck}</Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6">Boosts</Typography>

        {Object.entries(totals.boosts).map(([type, v]) => (
          <Box key={type} display="flex" alignItems="center" gap={1}>
            <img src={getIconPath(type)} width={20} />
            <Typography>{type}: +{v}%</Typography>
          </Box>
        ))}
      </Box>

      <Box mt={3}>
        <Typography variant="h6">Caps</Typography>

        {Object.entries(totals.caps).map(([type, v]) => (
          <Typography key={type}>
            {type}: +{v}%
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Compendium;