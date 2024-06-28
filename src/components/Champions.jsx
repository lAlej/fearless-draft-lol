import { Box, Button, Grid, Typography, colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  useChangeBansContext,
  useChangePicksContext,
  useSavePick,
  useTeamContext,
} from "../../providers/TeamsProvider";

export default function Champions() {
  const [allChampions, setAllChampions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const banChampion = useChangeBansContext();
  const pickChampion = useChangePicksContext();
  const teamData = useTeamContext();
  const savePick = useSavePick();
  const whosPicker = teamData.turn ? "rightTeam" : "leftTeam";

  const getChampions = async () => {
    const api = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/14.13.1/data/en_US/champion.json"
    );
    const data = await api.json();

    for (const champ in data.data) {
      setAllChampions((e) => [...e, data.data[champ]]);
    }
    setLoaded(true);
  };

  const pickedChamp = (champion) => {
    let champToValidate = champion.image.full;
    let picked = false;

    for (let playerInfo in teamData.leftTeam) {
      if (
        teamData.leftTeam[playerInfo].pick === champToValidate ||
        teamData.leftTeam[playerInfo].ban === champToValidate
      ) {
        picked = true;
      }
    }
    for (let playerInfo in teamData.rightTeam) {
      if (
        teamData.rightTeam[playerInfo].pick === champToValidate ||
        teamData.rightTeam[playerInfo].ban === champToValidate
      ) {
        picked = true;
      }
    }

    return picked;
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: teamData.banning ? "rgb(155, 11, 34)" : "rgb(45, 131, 140)",
    border: teamData.banning ? "2px solid rgb(155, 11, 34)" : "2px solid rgb(45, 131, 140)",
    backgroundColor: "rgb(30, 35, 39)",
    padding: "7px 40px",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "rgb(47, 34, 42)",
    },
    "&: disabled": {
      border: "2px solid rgb(97, 86, 92)",
      color: "rgb(90, 94, 95)",
    },
  }));

  const handleDisabledButton = () => {
    let buttonDisabled = false;
    const searchPlayer = teamData[whosPicker].find(
      (player) => player.name === teamData.whosPicking
    );

    if (teamData.banning) {
      if (searchPlayer.ban === "") {
        buttonDisabled = true;
      }
    }
    if (!teamData.banning && teamData.whosPicking !== "player10") {
      if (searchPlayer.pick === "") {
        buttonDisabled = true;
      }
    }

    return buttonDisabled;
  };

  const imageStyles = (champ) => {
    if (pickedChamp(champ)) {
      return {
        filter: "grayscale(100%)",
        transition: "all .2s",
      };
    }
  };

  useEffect(() => {
    getChampions();
  }, []);

  return (
    <Grid item container xs={12} height={"84.8vh"}>
      <Grid
        item
        container
        direction={"row"}
        overflow={"auto"}
        height={"77.8vh"}
        width={"100vw"}
        style={{
          scrollbarColor: "rgb(119, 91, 52) transparent",
          scrollbarWidth: "thin",
          overflowX: "hidden",
        }}
      >
        {loaded &&
          allChampions.map((champion) => (
            <Grid
              item
              container
              xs={2}
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              key={champion.key}
            >
              <Button
                disabled={pickedChamp(champion)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  marginBottom: 7,
                }}
                onClick={
                  teamData.banning
                    ? () => banChampion(champion, whosPicker)
                    : () => pickChampion(champion, whosPicker)
                }
              >
                <Box
                  component="img"
                  src={`https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${champion.image.full}`}
                  style={{
                    width: 90,
                    height: 90,
                    objectFit: "cover",
                    border: "2px solid rgb(95, 49, 51)",
                  }}
                  sx={imageStyles(champion)}
                  height={"100%"}
                />
                <Typography
                  style={{ color: "rgb(147, 128, 121)", textTransform: "none" }}
                >
                  {champion.name}
                </Typography>
              </Button>
            </Grid>
          ))}
      </Grid>
      <Grid
        container
        item
        xs={12}
        alignItems={"center"}
        height={"7vh"}
        justifyContent={"center"}
      >
        <ColorButton
          disabled={handleDisabledButton()}
          onClick={() => savePick(whosPicker)}
        >
          <Typography style={{ fontWeight: "bold", fontSize: 15 }}>
            {teamData.banning ? "Ban" : "Pick"}
          </Typography>
        </ColorButton>
      </Grid>
    </Grid>
  );
}
