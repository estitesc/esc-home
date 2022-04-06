import * as React from "react";
import AnimatedEsc from "./AnimatedEsc";
import NavButton from "./NavButton";

const Navbar: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ marginLeft: "-30px" }}>
        <AnimatedEsc />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <NavButton label="pics" linkTo="/pics" />
        <NavButton label="poems" linkTo="/poems" selected />
        <NavButton label="techs" linkTo="/techs" />
        <NavButton label="things" linkTo="/things" />
      </div>
    </div>
  );
};

export default Navbar;
