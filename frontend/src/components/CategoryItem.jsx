import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
} from "@mui/material";
import PropTypes from "prop-types";
import { getItemCost } from "../utilities/getItemCost";

const CategoryItem = ({ item }) => {
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {item.item_name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {item.item_description}
            <Chip
              label={getItemCost(item.item_price)}
              sx={{
                backgroundColor: "#81c784",
                color: "#232323",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0.5rem 0",
              }}
            />
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={item.item_image}
        alt={item.item_name}
      />
    </Card>
  );
};

CategoryItem.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.shape({
      item_id: PropTypes.string.isRequired,
      item_name: PropTypes.string.isRequired,
      item_description: PropTypes.string.isRequired,
      item_image: PropTypes.string.isRequired,
    })
  ),
};

export default CategoryItem;
