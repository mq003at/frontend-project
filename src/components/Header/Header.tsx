import { Fragment } from "react";
import Banner from "./Banner";
import HeaderButton from "./HeaderButton";

const Header: React.FC = () => {
  return (
    <nav>
      <Banner />
      <HeaderButton text="LOGO"></HeaderButton>
      <HeaderButton text="HOME"></HeaderButton>
      <HeaderButton text="PRODUCT"></HeaderButton>
      <HeaderButton text="PROFILE"></HeaderButton>
      <HeaderButton text="CART"></HeaderButton>
    </nav>
  );
};

export default Header;
