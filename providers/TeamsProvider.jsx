import React, { useContext, useState } from "react";

const teamContext = React.createContext();
const changePicks = React.createContext();
const changeBans = React.createContext();
const savePick = React.createContext();
const start = React.createContext();
const restart = React.createContext();

export const useTeamContext = () => {
  return useContext(teamContext);
};
export const useChangePicksContext = () => {
  return useContext(changePicks);
};
export const useChangeBansContext = () => {
  return useContext(changeBans);
};
export const useSavePick = () => {
  return useContext(savePick);
};
export const useStart = () => {
  return useContext(start);
};
export const useRestart = () => {
  return useContext(restart);
};

export const TeamProvider = ({ children }) => {
  const [teamsPikers, setTeamsPickers] = useState({
    leftTeam: [
      { name: "player1", pick: "", ban: "" },
      { name: "player2", pick: "", ban: "" },
      { name: "player3", pick: "", ban: "" },
      { name: "player4", pick: "", ban: "" },
      { name: "player5", pick: "", ban: "" },
    ],
    rightTeam: [
      { name: "player6", pick: "", ban: "" },
      { name: "player7", pick: "", ban: "" },
      { name: "player8", pick: "", ban: "" },
      { name: "player9", pick: "", ban: "" },
      { name: "player10", pick: "", ban: "" },
    ],
    turnPick: 0,
    turnBan: 0,
    banning: true,
    turn: false,
    whosPicking: "player1",
    start: false,
  });

  const updateBans = (newBan, team) => {

    console.log("ban: ", newBan, "team: ", team)
    setTeamsPickers((prev) => {
      let oldBans = { ...prev };

      const turn = oldBans.turnBan;

      oldBans[team][turn].ban = newBan.image.full;

      console.log("newObjetc: ", oldBans)

      return oldBans;
    });
  };

  const updatePicks = (newPick, team) => {
    setTeamsPickers((prev) => {
      let oldPicks = { ...prev };

      const turn = oldPicks.turnPick;

      oldPicks[team][turn].pick = newPick.image.full;

      return oldPicks;
    });
  };

  const handleSavePick = (team) => {


    setTeamsPickers((prev) => {
      let data = { ...prev };

      let realTeam = team === "leftTeam" ? "rightTeam" : "leftTeam";

      data.turn = !data.turn;

      if (team === "rightTeam" && data.turnBan < 5) {
        data.turnBan = data.turnBan + 1;
      } else if (team === "rightTeam" && data.turnPick < 6) {
        if (data.turnPick === 0 || data.turnPick === 2 || data.turnPick === 4) {
          data.turnPick = data.turnPick + 1;
          realTeam = "rightTeam"
          data.turn = true;
        }
      } else if ((team = "leftTeam" && data.turnPick < 6)) {
        if (data.turnPick === 1 || data.turnPick === 3) {
          data.turnPick = data.turnPick + 1;
          realTeam = "leftTeam"
          data.turn = false;
        }
      }

      if (data.rightTeam[4].ban !== "" && data.leftTeam[0].pick === "") {
        data.banning = !data.banning;
      }

      if (data.banning) {
        data.whosPicking = data[realTeam][data.turnBan].name;
      } else if (!data.banning && data.rightTeam[4].pick === "") {
        data.whosPicking = data[realTeam][data.turnPick].name;
      } 



      return data;
    });
  };

  const startPickBans = () => {
    setTeamsPickers((prev) => {
      const data = { ...prev };
      data.start = true;

      return data;
    });
  };

  const restartGame = () => {
    setTeamsPickers({
      leftTeam: [
        { name: "player1", pick: "", ban: "" },
        { name: "player2", pick: "", ban: "" },
        { name: "player3", pick: "", ban: "" },
        { name: "player4", pick: "", ban: "" },
        { name: "player5", pick: "", ban: "" },
      ],
      rightTeam: [
        { name: "player6", pick: "", ban: "" },
        { name: "player7", pick: "", ban: "" },
        { name: "player8", pick: "", ban: "" },
        { name: "player9", pick: "", ban: "" },
        { name: "player10", pick: "", ban: "" },
      ],
      turnPick: 0,
      turnBan: 0,
      banning: true,
      turn: false,
      whosPicking: "player1",
      start: false,
    });
  };
  return (
    <teamContext.Provider value={teamsPikers}>
      <start.Provider value={startPickBans}>
        <restart.Provider value={restartGame}>
          <savePick.Provider value={handleSavePick}>
            <changePicks.Provider value={updatePicks}>
              <changeBans.Provider value={updateBans}>
                {children}
              </changeBans.Provider>
            </changePicks.Provider>
          </savePick.Provider>
        </restart.Provider>
      </start.Provider>
    </teamContext.Provider>
  );
};
