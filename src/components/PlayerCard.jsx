import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSavePick, useTeamContext } from "../../providers/TeamsProvider";

export default function PlayerCard({ direction, data, ...props }) {
  const [endTurn, setEndTurn] = useState(true);
  const dataTeam = useTeamContext();

  const me = data.name;

  const style = {
    flexDirection: direction === "left" ? "row" : "row-reverse",
    borderBottom: "1px solid rgb(68, 33, 31)",
    paddingBottom: 20,
    paddingTop: 10,
  };

  const bannignStyles = {
    width: 40,
    height: 40,
    objectFit: "cover",
    transition: "all 1s ",
    display: me === dataTeam.whosPicking && dataTeam.banning === true ? "flex" : "none",
  };

  const srcLink = (src) => {
    if (src !== "") {
      return `https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${src}`;
    }

    return "./images/social-icon.png";
  };

  return (
    <Grid item container alignItems={"center"} gap={1} style={style}>
      <Box
        component="img"
        src={srcLink(data.ban)}
        style={bannignStyles}
        height={"100%"}
        sx={{ border: "1px solid rgb(21, 21, 23)" }}
      />
      <Box
        component="img"
        src={srcLink(data.pick)}
        style={{
          width: 70,
          height: 70,
          objectFit: "cover",
          transition: "all 1s ",
          borderRadius: "50%",
          border: "3px solid rgb(84, 68, 35)",
        }}
        height={"100%"}
      />
      <Grid>
        <Typography>Support</Typography>
        <Typography>Luisito</Typography>
      </Grid>
    </Grid>
  );
}
