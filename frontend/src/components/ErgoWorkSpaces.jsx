import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getItemCost } from "../utilities/getItemCost";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WorkspacesAPI from "../services/workspaces";

const ErgoWorkspaces = ({ workspaces }) => {
  const handleDelete = async (id) => {
    try {
      const data = await WorkspacesAPI.deleteWorkSpace(id);
      console.log(data);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="workspaces">
      {workspaces.map((workspace) => (
        <Card
          key={workspace.workspace_id}
          className="workspace-card"
          sx={{ maxWidth: 345, display: "flex" }}
        >
          <CardMedia
            component="img"
            image={workspace.workspace_image}
            title={workspace.workspace_name}
            sx={{ height: 140, objectFit: "fill" }}
          />
          <CardContent>
            <Typography variant="h5">{workspace.workspace_name}</Typography>
            <Typography
              sx={{
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
              variant="body2"
              color="text.secondary"
            >
              {workspace.workspace_description}
            </Typography>
            <Box>
              <Chip
                label={`Total Price: ${getItemCost(workspace.workspace_price)}`}
                variant="outlined"
              />
            </Box>
          </CardContent>
          <CardActions>
            {/* View */}
            <Link to={`/workspaces/${workspace.workspace_id}`}>
              <IconButton aria-label="view">
                <VisibilityIcon />
              </IconButton>
            </Link>
            {/* Edit */}
            <Link to={`/workspaces/${workspace.workspace_id}/edit`}>
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </Link>
            {/* Bookmark */}
            <IconButton aria-label="bookmark">
              <BookmarkIcon />
            </IconButton>
            {/* Delete */}
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(workspace.workspace_id)}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

ErgoWorkspaces.propTypes = {
  workspaces: PropTypes.arrayOf(
    PropTypes.shape({
      workspace_id: PropTypes.string.isRequired,
      workspace_name: PropTypes.string.isRequired,
      workspace_description: PropTypes.string.isRequired,
      workspace_price: PropTypes.string.isRequired,
      workspace_image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ErgoWorkspaces;
