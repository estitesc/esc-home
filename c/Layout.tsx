import * as React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import styles from "../styles/Home.module.css";

interface LayoutProps {
  children: React.ReactNode;
  selectedSection?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, selectedSection }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>escribblings</title>
        <meta name="description" content="esc's website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar selectedSection={selectedSection} />
      {children}
    </div>
  );
};

export default Layout;
