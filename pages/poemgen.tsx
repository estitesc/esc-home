import * as React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Layout from "../c/Layout";

const PoemGen: NextPage = () => {
  const [poemTitleInput, setPoemTitleInput] = React.useState("");
  const [result, setResult] = React.useState();

  async function onSubmit(event: any) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: poemTitleInput }),
    });
    const data = await response.json();
    console.log("data", data);
    setResult(data.result);
    setPoemTitleInput("");
  }

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Enter the title of a Poem</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Roses are red"
            value={poemTitleInput}
            onChange={(e) => setPoemTitleInput(e.target.value)}
          />
          <input type="submit" value="Generate poem" />
        </form>
        <div className={styles.result}>
          <pre>{result}</pre>
        </div>
      </div>
    </Layout>
  );
};

export default PoemGen;
