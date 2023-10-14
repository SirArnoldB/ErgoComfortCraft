import React from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import Slider from "react-slick";
import CategoryItem from "./CategoryItem";
import PropTypes from "prop-types";
import { CardHeader } from "@mui/material";

const ErgoSlider = ({
  categoriesAndItems,
  selectedItems,
  handleItemChange,
}) => {
  const sliderRefs = categoriesAndItems.map(() => React.createRef());

  console.log(selectedItems);

  const settings = {
    dots: false,
    infinite: true,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <FormControl sx={{ display: "flex" }}>
      {categoriesAndItems.map((category, categoryIndex) => (
        <Card
          key={categoryIndex}
          sx={{ marginBottom: "1rem", padding: "1rem" }}
        >
          <CardHeader
            title={`${category.category_name} Selection`}
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "0.5rem",
            }}
          />
          <Slider
            ref={sliderRefs[categoryIndex]}
            {...settings}
            style={{ paddingRight: "50px", paddingLeft: "50px" }}
          >
            {category.items.map((item, itemIndex) => (
              <FormControlLabel
                key={itemIndex}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0.5rem",
                }}
                control={
                  <Checkbox
                    checked={selectedItems[categoryIndex]?.[itemIndex]}
                    onChange={() => handleItemChange(categoryIndex, itemIndex)}
                    name={`item-${categoryIndex}-${itemIndex}`}
                  />
                }
                label={<CategoryItem item={item} />}
                labelPlacement="bottom"
              />
            ))}
          </Slider>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <button
              type="button"
              onClick={() => sliderRefs[categoryIndex].current.slickPrev()}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => sliderRefs[categoryIndex].current.slickNext()}
            >
              Next
            </button>
          </div>
        </Card>
      ))}
    </FormControl>
  );
};

ErgoSlider.propTypes = {
  categoriesAndItems: PropTypes.arrayOf(
    PropTypes.shape({
      category_name: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          item_id: PropTypes.string.isRequired,
          item_name: PropTypes.string.isRequired,
          item_description: PropTypes.string.isRequired,
          item_image: PropTypes.string.isRequired,
        })
      ),
    })
  ),
  selectedItems: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.bool.isRequired)
  ),
  handleItemChange: PropTypes.func.isRequired,
};

export default ErgoSlider;
