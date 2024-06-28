import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRestart, useTeamContext } from "../../providers/TeamsProvider";

export default function CouterHotbar() {
  const [countdown, setCountdown] = useState(15);
  const [restartModal, setRestartModal] = useState(false);
  const [textModal, setTextModal] = useState("");
  const [title, setTitle] = useState("");

  const dataTeam = useTeamContext();
  const restartGame = useRestart();

  const handleModal = () => {
    setRestartModal(false);
    setCountdown(15);
    restartGame();
  };

  const titleSetter = () => {
    if (dataTeam.banning) {
      setTitle("Ban a Champion!");
    } else {
      setTitle("Pick a Champion");
    }
    if (dataTeam["rightTeam"][4].pick !== "") {
      setTitle("Empieza pronto");
    }
  };

  useEffect(() => {
    if (countdown < 1) {
      if (dataTeam["rightTeam"][4].pick !== "") {
        setTextModal("Empieza el juego (reiniciar)");
        setRestartModal(true);
      } else {
        setTextModal("campeon no seleccionado (reiniciar)");
        setRestartModal(true);
      }
    }
  }, [countdown]);

  useEffect(() => {
    let intervalId;
    titleSetter();

    if (dataTeam.start) {
      setCountdown(15);

      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          }
          return prevCountdown;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [dataTeam.start, dataTeam.turnBan, dataTeam.turnPick, dataTeam.turn]);

  useEffect(() => {
    titleSetter();
  }, []);

  return (
    <Grid
      item
      container
      direction={"row"}
      alignItems={"end"}
      justifyContent={"center"}
      height={"15vh"}
    >
      <Grid item xs={12} style={{ paddingTop: 20 }}>
        <Typography
          style={{
            fontSize: 30,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
          textAlign={"center"}
        >
          {title}
        </Typography>
      </Grid>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        item
        xs={12}
        gap={1}
      >
        <Box
          width={"40%"}
          height={8}
          sx={{
            backgroundColor: dataTeam.banning
              ? "rgb(157, 24, 45)"
              : "rgb(17, 119, 143)",
          }}
        >
          <Box
            width={`${((15 - countdown) / 15) * 100}%`}
            height={8}
            bgcolor={dataTeam.banning ? "rgb(50, 9, 15)" : "rgb(6, 29, 35)"}
            sx={{ transition: "all 1s" }}
          />
        </Box>
        <Typography style={{ fontSize: 40, color: "rgb(244, 217, 208)" }}>
          {countdown}
        </Typography>

        <Box
          width={"40%"}
          height={8}
          bgcolor={dataTeam.banning ? "rgb(50, 9, 15)" : "rgb(6, 29, 35)"}
        >
          <Box
            width={`${(countdown / 15) * 100}%`}
            sx={{ transition: "all 1s" }}
            textAlign={"end"}
            height={8}
            bgcolor={
              dataTeam.banning ? "rgb(157, 24, 45)" : "rgb(17, 119, 143)"
            }
          />
        </Box>
      </Grid>
      <Modal open={restartModal}>
        <Button sx={style} onClick={handleModal}>
          <Typography style={{ textAlign: "center" }}>{textModal}</Typography>
        </Button>
      </Modal>
    </Grid>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "rgb(51, 2, 0)",
  color: "white",
  borderRadius: 5,
  borderColor: "#000",
  p: 4,
  "&:hover": {
    backgroundColor: "rgb(31, 1, 0)",
    borderColor: "#000",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "rgb(31, 1, 0)",
    borderColor: "#000",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
};
