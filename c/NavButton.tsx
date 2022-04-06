import Link from "next/link";
import * as React from "react";
import styles from "../styles/NavButton.module.css";

interface NavButtonProps {
  label: string;
  linkTo: string;
  selected?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ label, linkTo, selected }) => {
  return (
    <div className={selected ? styles.selectedbutton : styles.navbutton}>
      <Link href={linkTo}>{label}</Link>
    </div>
  );
};

export default NavButton;
