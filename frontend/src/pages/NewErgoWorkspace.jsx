import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  FormControl,
} from "@mui/material";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import "slick-carousel/slick/slick.css";
import "slick-carousel";
import CategoriesAPI from "../services/categories";
import WorkspcaesAPI from "../services/workspaces";
import ErgoSlider from "../components/ErgoSlider";

const NewErgoWorkspace = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [categoriesAndItems, setCategoriesAndItems] = useState([]);

  useEffect(() => {
    const fetchCategoriesAndItems = async () => {
      try {
        const data = await CategoriesAPI.getAllCategoriesAndItems();
        setCategoriesAndItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoriesAndItems();
  }, []);

  const handleItemChange = (categoryIndex, itemIndex) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = [...prevSelectedItems];
      if (!newSelectedItems[categoryIndex]) {
        newSelectedItems[categoryIndex] = [];
      }
      newSelectedItems[categoryIndex][itemIndex] =
        !newSelectedItems[categoryIndex][itemIndex];
      return newSelectedItems;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the selected items
    const selectedItemsArray = categoriesAndItems.map(
      (category, categoryIndex) =>
        category.items.filter(
          (_, itemIndex) => selectedItems[categoryIndex]?.[itemIndex]
        )
    );

    // Calculate the total price of the selected items
    const totalPrice = selectedItemsArray
      .flat()
      .reduce((acc, item) => acc + parseFloat(item.item_price), 0);

    const newWorkspace = {
      workspace_name: workspaceName,
      workspace_description: workspaceDescription,
      workspace_price: totalPrice,
      workspace_image: "/src/assets/background/bg2.jpeg",
      items: selectedItemsArray.flat().map((item) => item.item_id),
    };

    try {
      await WorkspcaesAPI.createWorkSpace(newWorkspace);
      alert("New custom ergonomic workspace created successfully.");
      window.location = "/workspaces";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: "90vw",
          marginTop: "5rem",
        }}
      >
        <CardHeader title="Add New Custom Ergonomic Workspace" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ErgoSlider
                  categoriesAndItems={categoriesAndItems}
                  selectedItems={selectedItems}
                  handleItemChange={handleItemChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="ErgoComfort WorkSpace Details" />
                  <CardContent>
                    <FormControl sx={{ display: "flex" }}>
                      <TextField
                        fullWidth
                        label="ErgoComfortCraft WorkSpace Name"
                        value={workspaceName}
                        variant="filled"
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        helperText="The name of your custom ergonomic workspace."
                        InputProps={{
                          endAdornment: (
                            <WorkspacesIcon
                              sx={{ color: "blue", marginRight: "0.5rem" }}
                            />
                          ),
                        }}
                      />
                    </FormControl>
                    <FormControl sx={{ display: "flex" }}>
                      <TextField
                        fullWidth
                        label="ErgoComfortCraft WorkSpace Description"
                        value={workspaceDescription}
                        variant="filled"
                        onChange={(e) =>
                          setWorkspaceDescription(e.target.value)
                        }
                        helperText="The description of your custom ergonomic workspace."
                        InputProps={{
                          endAdornment: (
                            <WorkspacesIcon
                              sx={{ color: "blue", marginRight: "0.5rem" }}
                            />
                          ),
                        }}
                      />
                    </FormControl>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  borderColor: "#81c784",
                  textTransform: "none",
                  color: "#232323",
                  "&:hover": {
                    backgroundColor: "#28a745",
                    color: "#fff",
                  },
                  margin: "1rem 0",
                }}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default NewErgoWorkspace;
