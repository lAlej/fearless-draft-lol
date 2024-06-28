import { Box } from "@mui/material";

export default function StyledImageContainer({data}) {


  const srcLink = () => {
    
    if(data.ban !== "") {
      return `https://ddragon.leagueoflegends.com/cdn/14.13.1/img/champion/${data.ban}`
    }

    return "./images/social-icon.png"
  }

  return (
    <Box
      component="img"
      src={srcLink()}
      style={{
        width: 50,
        height: 50,
        objectFit: "cover",
        transition: "all 1s ",
        border: "1px solid rgb(21, 21, 23)"
      }}
      height={"100%"}
    />
  );
}
