import { Grid } from "@mui/material";
import BanList from "./BansList";
import PlayerCard from "./PlayerCard";
import { useTeamContext } from "../../providers/TeamsProvider";

export default function SideBarLeft({ direction }) {
  const team = direction === "left" ? "leftTeam" : "rightTeam";

  const pickTeamInfo = useTeamContext();

  const style = {
    paddingLeft: direction === "left" && 20,
    paddingRight: direction !== "left" && 20
  }

  return (
    <Grid item container gap={2} style={style}>
      <BanList direction={direction} />
      <PlayerCard direction={direction} data={pickTeamInfo[team][0]} />
      <PlayerCard direction={direction} data={pickTeamInfo[team][1]} />
      <PlayerCard direction={direction} data={pickTeamInfo[team][2]} />
      <PlayerCard direction={direction} data={pickTeamInfo[team][3]} />
      <PlayerCard direction={direction} data={pickTeamInfo[team][4]} />
    </Grid>
  );
}
