import {
  Box,
  Checkbox,
  Typography,
  Divider,
  Tooltip,
  Grid,
} from "@mui/material";

import { useChamberOfLife } from "../../context/ChamberOfLifeContext";
import { BoostMap } from "../../types/ChamberOfLifeBoost";

// ---------------- ICON ----------------

const getIconPath = (category: string, type: "boost" | "cap") => {
  const clean = category.toLowerCase();

  if (clean === "hp") return "/assets/status/hp.png";
  if (clean === "mp") return "/assets/status/mp.png";
  if (clean === "quickness") return "/assets/status/quickness.png";

  return `/assets/status/${clean}_${type}.png`;
};

// ---------------- COMPONENT ----------------

const ChamberOfLife = () => {
  const {
    reinforce,
    limitMastery,
    selected,
    handleToggle,
    totals,
  } = useChamberOfLife();

  const renderSection = (
    title: string,
    data: BoostMap,
    type: "boost" | "cap",
    group: "reinforce" | "limitMastery"
  ) => (
    <Box>
      <Typography variant="h6" mb={3} align="center">
        {title}
      </Typography>

      {Object.entries(data).map(([category, levels]) => {
        const current = selected[group][category] || 0;
        const iconSrc = getIconPath(category, type);

        return (
          <Box key={category}>
            <Typography fontWeight="bold" >
              {category}
            </Typography>

            <Box display="flex" flexWrap="wrap">
              {levels.map((entry) => (
                <Tooltip
                  key={`${category}-${entry.level}`}
                  title={`Lv${entry.level} - ${entry.effect}`}
                  arrow
                >
                  <Checkbox
                    checked={entry.level <= current}
                    onChange={() =>
                      handleToggle(group, category, entry.level)
                    }
                    icon={
                      <img
                        src={iconSrc}
                        alt={category}
                        style={{
                          width: 32,
                          height: 32,
                          opacity: 0.4,
                          filter: "grayscale(100%)",
                        }}
                      />
                    }
                    checkedIcon={
                      <img
                        src={iconSrc}
                        alt={category}
                        style={{
                          width: 32,
                          height: 32,
                        }}
                      />
                    }
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Chamber of Life
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          {renderSection("Boost", reinforce, "boost", "reinforce")}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          {renderSection("Cap", limitMastery, "cap", "limitMastery")}

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" mb={1}>
            Totals
          </Typography>

          <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <img src={getIconPath("HP", "boost")} width={20} />
              <Typography>
                HP: Player +{totals.hp} / Demon +{totals.hp}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <img src={getIconPath("MP", "boost")} width={20} />
              <Typography>
                MP: Player +{totals.mp} / Demon +{totals.mp}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <img src={getIconPath("Quickness", "boost")} width={20} />
              <Typography>
                Movespeed: Player +{totals.movespeed}% / Demon +{totals.movespeed}%
              </Typography>
            </Box>
          </Box>

          <Box mt={2}>
            <Typography variant="h6">Boosts</Typography>

            {Object.entries(totals.boosts)
              .map(([type, v]) => (
                <Box
                  key={type}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <img
                    src={getIconPath(type, "boost")}
                    alt={type}
                    width={20}
                    height={20}
                  />

                  <Typography>
                    {type}: Player +{v.player}% / Demon +{v.demon}%
                  </Typography>
                </Box>
              ))}
          </Box>

          <Box mt={2}>
            <Typography variant="h6">Caps</Typography>

            {Object.entries(totals.caps)
              .map(([type, v]) => (
                <Box
                  key={type}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <img
                    src={getIconPath(type, "cap")}
                    alt={type}
                    width={20}
                    height={20}
                  />

                  <Typography>
                    {type}: Player +{v.player}% / Demon +{v.demon}%
                  </Typography>
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChamberOfLife;