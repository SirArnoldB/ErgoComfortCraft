import { Link } from "react-router-dom";
import "./css/App.css";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h1>Welcome to ErgoComfortCraft!</h1>
        <Link to="/workspaces">Products</Link>
        <Link to="/categories">Categories</Link>
        <Link to="items">Items</Link>
      </div>
    </>
  );
}

export default App;
