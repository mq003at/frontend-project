import { AppBar, Box, Button, Typography, Grid } from "@mui/material";
import { Fragment, useState } from "react";
import Banner from "./Banner";
import HeaderButton from "./HeaderButton";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "@mui/icons-material";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navButtonArray = ["PRODUCTS", "PROFILE", "CART"];
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  const makeNavButton = (text: string) => {
    return (
      <Grid item xs={2} key={`navButton-${text}`}>
        <HeaderButton text={text}></HeaderButton>
      </Grid>
    );
  };

  const makeSearchNav = () => {
    return (
      <Grid item xs={4}>
        <form>
          <Box className="search-bar">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleChange} />
          </Box>
        </form>
      </Grid>
    );
  };

  return (
    <AppBar position="fixed">
      <Grid container display="flex" flexDirection="row" alignItems="center" bgcolor="white">
        <Grid item xs={14}>
          <Banner />
        </Grid>
        <Grid className="navBar-functionrow" item xs={14}>
          <Grid container alignItems="center" width={"80%"}>
            {makeNavButton("HOME")}
            {makeSearchNav()}
            {navButtonArray.map((button) => makeNavButton(button))}
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
