import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../c/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 400, marginTop: 24 }}>
          <div style={{ fontWeight: "bold", margin: "12px 0 12px" }}>
            hi there
          </div>
          <div style={{ marginBottom: 12 }}>
            you have reached the personal website of evan stites-clayton.
          </div>
          <div style={{ marginBottom: 12 }}>
            what you will find here is escribblings. which are the little
            doodles and thoughts and tech makings of esc.
          </div>
          <div style={{ marginBottom: 12 }}>
            just arriving? why not have a look at the{" "}
            <span style={{ fontWeight: "bold" }}>
              <Link href={"/booky"}>magic booky</Link>
            </span>
            ? it tells you what you need to hear.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
