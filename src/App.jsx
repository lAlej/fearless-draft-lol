import { Grid } from "@mui/material";
import "./App.css";
import Champions from "./components/Champions";
import Sidebar from "./components/Sidebar";
import CouterHotbar from "./components/CouterHotbar";
import { useTeamContext } from "../providers/TeamsProvider";

function App() {
  const dataTeam = useTeamContext();

  const mainStyles = {
    color: "#FFF",
    background: "rgb(51,2,0)",
    transition: "all .5s",
    background: dataTeam.banning
      ? "linear-gradient(90deg, rgba(51,2,0,1) 14%, rgba(0,0,0,0.9472163865546218) 23%, rgba(51,2,0,1) 30%, rgba(51,2,0,1) 71%, rgba(0,0,0,0.95) 79%, rgba(51,2,0,1) 84%)"
      : "linear-gradient(90deg, rgba(2,40,52,1) 14%, rgba(0,0,0,0.9472163865546218) 23%, rgba(2,40,52,1) 30%, rgba(2,40,52,1) 71%, rgba(0,0,0,0.95) 79%, rgba(2,40,52,1) 84%)",
  };

  return (
    <Grid container maxHeight={"100vh"} style={mainStyles}>
      <Grid item xs={3}>
        <Sidebar direction={"left"} />
      </Grid>
      <Grid item xs={6}>
        <CouterHotbar />
        <Champions />
      </Grid>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
    </Grid>
  );
}

export default App;
