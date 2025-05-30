import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import { useEffect } from "react";

const ThemeSwitchButton = () => {
  const { colorScheme, setMode } = useColorScheme();

  useEffect(() => {}, [colorScheme, setMode]); // runs once after the component mounts

  return (
    <IconButton
      disableRipple
      onClick={() => {
        setMode(colorScheme === "light" ? "dark" : "light");
      }}
      color="inherit"
    >
      {colorScheme === "dark" ? (
        <Brightness7Icon sx={{ width: 35, height: 35 }} />
      ) : (
        <Brightness4Icon sx={{ width: 35, height: 35 }} />
      )}
    </IconButton>
  );
};

export default ThemeSwitchButton;
