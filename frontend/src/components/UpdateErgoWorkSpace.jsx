import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import WorkspacesAPI from "../services/workspaces";
import ErgoSlider from "./ErgoSlider.jsx";

const UpdateErgoWorkspace = () => {
  const { id } = useParams();
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [categoriesAndItems, setCategoriesAndItems] = useState([]);
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const data = await WorkspacesAPI.getWorkSpace(id);
        setWorkspace(data);
        setWorkspaceName(data.workspace_name);
        setWorkspaceDescription(data.workspace_description);

        setSelectedItems(
          categoriesAndItems.map((category) =>
            category.items.map((item) =>
              data.items.some(
                (workspaceItem) => workspaceItem.item_id === item.item_id
              )
            )
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategoriesAndItems = async () => {
      try {
        const data = await CategoriesAPI.getAllCategoriesAndItems();
        setCategoriesAndItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWorkspace();
    fetchCategoriesAndItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

    const updatedWorkspace = {
      workspace_id: id,
      workspace_name: workspaceName,
      workspace_description: workspaceDescription,
      workspace_price: totalPrice,
      workspace_image: "/src/assets/background/bg2.jpeg",
      items: selectedItemsArray.flat().map((item) => item.item_id),
    };

    try {
      await WorkspacesAPI.updateWorkSpace(updatedWorkspace);
      alert("Custom ergonomic workspace updated successfully.");
      window.location = `/workspaces/${id}`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {workspace && (
        <Card
          sx={{
            width: "90vw",
            marginTop: "5rem",
          }}
        >
          <CardHeader title={`Update ${workspace.workspace_name}`} />
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
                  Update
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default UpdateErgoWorkspace;
