import * as React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Layout from "../c/Layout";

const PoemGen: NextPage = () => {
  const [poemTitleInput, setPoemTitleInput] = React.useState("");
  const [result, setResult] = React.useState("");

  async function onSubmit(event: any) {
    event.preventDefault();
    setResult("generating...");
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
        <div style={{ maxWidth: 400 }}>
          <h3>Enter the title of a poem</h3>
          {/* <p>The GPT3 AI will write it.</p> */}
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Penguins Look Funny"
              value={poemTitleInput}
              onChange={(e) => setPoemTitleInput(e.target.value)}
              style={{ padding: 4 }}
            />
            <div style={{ marginTop: 12 }}>
              <input
                type="submit"
                value="Generate poem"
                style={{ padding: "4px 12px", fontFamily: "monospace" }}
              />
            </div>
          </form>
          <div className={styles.result}>
            <pre>{result}</pre>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PoemGen;
