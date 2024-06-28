import { Box, Grid } from "@mui/material";
import { useTeamContext } from "../../providers/TeamsProvider";
import StyledImageContainer from "./StyledImageContainer";

export default function BanList({ direction }) {
  const team = direction === "left" ? "leftTeam" : "rightTeam";

  const banTeamInfo = useTeamContext();

  const style = {
    flexDirection: direction === "left" ? "row" : "row-reverse",
    paddingLeft: direction === "left" && 10,
    paddingRight: direction !== "left" && 10,
    paddingTop: 10,
  };

  return (
    <Grid container item xs={12} gap={2} style={style}>
      <StyledImageContainer data={banTeamInfo[team][0]}/>
      <StyledImageContainer data={banTeamInfo[team][1]}/>
      <StyledImageContainer data={banTeamInfo[team][2]}/>
      <StyledImageContainer data={banTeamInfo[team][3]}/>
      <StyledImageContainer data={banTeamInfo[team][4]}/>
    </Grid>
  );
}
