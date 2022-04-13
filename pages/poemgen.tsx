import * as React from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Layout from "../c/Layout";
import { poemStyles } from "../constants/poemStyles";

const PoemGen: NextPage = () => {
  const [poemTitleInput, setPoemTitleInput] = React.useState("");
  const [poemStyle, setPoemStyle] = React.useState("none");
  const [result, setResult] = React.useState("");

  async function onSubmit(event: any) {
    event.preventDefault();
    setResult("generating...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: poemTitleInput, style: poemStyle }),
    });
    const data = await response.json();
    console.log("data", data);
    setResult(data.result);
    // setPoemTitleInput("");
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
        <div style={{ width: 350 }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            Enter the title of a poem
          </div>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Penguins Look Funny"
              value={poemTitleInput}
              onChange={(e) => setPoemTitleInput(e.target.value)}
              style={{ padding: 4 }}
            />
            <div
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 16,
                marginTop: 16,
              }}
            >
              and choose a style (optional)
            </div>
            <div>
              <select
                onChange={(e) => setPoemStyle(e.target.value)}
                value={poemStyle}
              >
                {Object.keys(poemStyles).map((key: string) => {
                  return (
                    <option value={key} key={key}>
                      {poemStyles[key].name}
                    </option>
                  );
                })}
              </select>
            </div>
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
