import * as React from "react";
import AnimatedEsc from "./AnimatedEsc";
import NavButton from "./NavButton";
import useIsDesktop from "../h/useIsDesktop";

interface NavbarProps {
  selectedSection?: string;
}

const Navbar: React.FC<NavbarProps> = ({ selectedSection }) => {
  const isDesktop = useIsDesktop();

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
        <NavButton
          label={isDesktop ? "poem/generator" : "p/g"}
          linkTo="/poemgen"
          selected={selectedSection == "poemgen"}
        />
        <NavButton
          label={isDesktop ? "little/magic/booky" : "l/m/b"}
          linkTo="/booky"
          selected={selectedSection == "booky"}
        />
        {/* <NavButton label="techs" linkTo="/techs" />
        <NavButton label="things" linkTo="/things" /> */}
      </div>
    </div>
  );
};

export default Navbar;
