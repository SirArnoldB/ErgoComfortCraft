import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import PropTypes from "prop-types";

const InfoCard = ({ info }) => {
  return (
    <Card
      sx={{
        width: 345,
        height: 500,
      }}
    >
      <CardHeader
        sx={{
          backgroundColor: "#d6f5d6",
          border: "1px solid #28a745",
          textAlign: "left",
        }}
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="Fact">
            <TipsAndUpdatesIcon />
          </Avatar>
        }
        title={info.title}
      />
      <CardMedia
        sx={{
          height: 150,
          width: 345,
        }}
        image={info.imageURL}
        title={info.title}
        component={"img"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.fact}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {info.details}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="small"
          variant="outlined"
          sx={{
            color: "#232323",
            borderColor: "#81c784",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#28a745",
              color: "#fff",
            },
          }}
          onClick={() => window.open(info.URL, "_blank")}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

InfoCard.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string.isRequired,
    fact: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    URL: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default InfoCard;
