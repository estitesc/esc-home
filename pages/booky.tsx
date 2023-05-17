import type { NextPage } from "next";
import Layout from "../c/Layout";

const Booky: NextPage = () => {
  return (
    <Layout selectedSection="booky">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 400, marginTop: 24 }}>
          <div style={{ fontWeight: "bold", margin: "12px 0 12px" }}>
            entry hf04 x12drm
          </div>
          <div style={{ marginBottom: 12 }}>
            U are swimming in an ocean of creative freedom. Take note of all the
            wonderful possibilities around U, the schools of fish, the swaying
            kelp.
          </div>
          <div style={{ marginBottom: 12 }}>
            Also know that U must pick a direction to swim in. U must swim that
            way for quite some time.
          </div>
          <div style={{ marginBottom: 12 }}>
            U must be persistent in order to cross the next horizon. The ocean
            is full of opportunities and delights. Take note of these. Be aware
            of these. These surroundings are the fruits of Ur journey. But
            remember to stay on Ur chosen path.
          </div>
          <div style={{ marginBottom: 12 }}>
            Remember the direction U set out to swim in.
          </div>
          <div style={{ marginBottom: 12 }}>Swim in that direction.</div>
          <div style={{ marginBottom: 4 }}>xox,</div>
          <div style={{ marginBottom: 12 }}>lmb</div>
        </div>
      </div>
    </Layout>
  );
};

export default Booky;
