import { Typography, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeCards from "../components/HomeCards";

const Home = () => {
  const theme = useTheme();

  return (
    <div>
      <Typography
        variant="h3"
        style={{
          textAlign: "center",
        }}
      >
        Welcome to ErgoComfortCraft!
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
            padding: "1rem",
          }}
        >
          Your Ergonomic WorkSpace Designer.
        </Typography>
      </Typography>
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
          padding: "1rem",
        }}
      >
        This is your one-stop-hub for managing, and discovering Ergonomic
        Workspaces.
      </Typography>
      <HomeCards />
      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#81c784",
              textTransform: "none",
              color: "#232323",
              "&:hover": {
                backgroundColor: "#28a745",
                color: "#fff",
              },
            }}
          >
            Create Now ErgoWorkSpace!
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
