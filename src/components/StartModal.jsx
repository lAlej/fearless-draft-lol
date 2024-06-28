import { Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useStart, useTeamContext } from "../../providers/TeamsProvider";

export default function StartModal() {
  const startGame = useStart();
  const startValue = useTeamContext();
  const [modal, setModal] = useState(true);

  const handleCloseModal = () => {
    setModal(false);
    startGame();
  };

  useEffect(() => {
    if (startValue.start === false) {
      setModal(true);
    }
  }, [startValue.start]);

  return (
    <Modal open={modal}>
      <Button sx={style} onClick={handleCloseModal}>
        <Typography style={{ textAlign: "center" }}>Start Game</Typography>
      </Button>
    </Modal>
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
