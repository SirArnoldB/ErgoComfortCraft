import ErgonomicDrawer from "./components/ErgonomicDrawer";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import ErgonomicWorkspaceForm from "./pages/NewErgoWorkspace.jsx";
import AllErgoWorkspaces from "./pages/AllErgoWorkspaces";
import WorkSpaceDetails from "./components/WorkSpaceDetails";
import UpdateErgoWorkspace from "./components/UpdateErgoWorkSpace";
import "./css/App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/workspaces",
      element: <AllErgoWorkspaces />,
    },
    {
      path: "/workspaces/:workspaceId",
      element: <WorkSpaceDetails />,
    },
    {
      path: "/workspaces/new",
      element: <ErgonomicWorkspaceForm />,
    },
    {
      path: "/workspaces/:id/edit",
      element: <UpdateErgoWorkspace />,
    },
  ]);

  return (
    <div className="App">
      <ErgonomicDrawer />
      {element}
    </div>
  );
};

export default App;
