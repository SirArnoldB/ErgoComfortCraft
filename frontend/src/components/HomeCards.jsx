import Stack from "@mui/material/Stack";
import InfoCard from "./InfoCard";
import Box from "@mui/material/Box";
import { infoCardsData } from "../utilities/infoCardsData";

const HomeCards = () => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        padding={{ xs: 1, sm: 2, md: 4 }}
      >
        <InfoCard info={infoCardsData[0]} />
        <InfoCard info={infoCardsData[1]} />
        <InfoCard info={infoCardsData[2]} />
      </Stack>
    </Box>
  );
};

export default HomeCards;
