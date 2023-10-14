import { useState, useEffect } from "react";
import ErgoWorkspaces from "../components/ErgoWorkSpaces";
import WorkspacesAPI from "../services/workspaces";

const AllErgoWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const data = await WorkspacesAPI.getAllWorkSpaces();
        setWorkspaces(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkspaces();
  }, []);

  return <ErgoWorkspaces workspaces={workspaces} />;
};

export default AllErgoWorkspaces;
