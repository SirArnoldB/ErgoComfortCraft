import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  Chip,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CardActions,
  IconButton,
} from "@mui/material";
import WorkspacesAPI from "../services/workspaces";
import { getItemCost } from "../utilities/getItemCost";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link } from "react-router-dom";

const WorkSpaceDetails = () => {
  const { workspaceId } = useParams();
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const data = await WorkspacesAPI.getWorkSpace(workspaceId);
        console.log(data);
        setWorkspace(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkspace();
  }, [workspaceId]);

  const handleDelete = async () => {
    try {
      await WorkspacesAPI.deleteWorkSpace(workspaceId);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  if (!workspace) {
    return null;
  }

  return (
    <Card>
      <CardHeader title={workspace.workspace_name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {workspace.workspace_description}
        </Typography>
        <Divider style={{ margin: "1rem 0" }} />
        <Chip
          label={getItemCost(workspace.workspace_price)}
          sx={{
            backgroundColor: "#81c784",
            color: "#232323",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0.5rem 0",
          }}
        />
        <Typography variant="h6" component="h2">
          Workspace Items
        </Typography>
        <List>
          {workspace.items.map((item) => (
            <ListItem key={item.item_id}>
              <ListItemIcon>
                <img
                  src={item.item_image}
                  alt={item.item_name}
                  style={{ width: "50px", height: "50px" }}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.item_name}
                secondary={`$${item.item_price}`}
              />
            </ListItem>
          ))}
        </List>
        <Divider style={{ margin: "1rem 0" }} />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
        <IconButton aria-label="delete" onClick={() => handleDelete()}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default WorkSpaceDetails;
