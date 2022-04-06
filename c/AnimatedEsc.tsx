import type { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import _ from "lodash";

const X_POS_MIN = -40;
const X_POS_MAX = 40;
const Y_POS_MIN = -40;
const Y_POS_MAX = 40;
const MAX_SPEED = 300;
const letters = "esc";
const NUM_CIRCLES = letters.length;

const fixedPoints = [
  [-70, 50],
  [0, 50],
  [70, 50],
];

const AnimatedName: NextPage = () => {
  const initXPos = Array.apply(null, Array(NUM_CIRCLES)).map(() =>
    _.random(X_POS_MIN, X_POS_MAX)
  );
  const initYPos = Array.apply(null, Array(NUM_CIRCLES)).map(() =>
    _.random(Y_POS_MIN, Y_POS_MAX)
  );

  const initXVel = Array.apply(null, Array(NUM_CIRCLES)).map(() => 0);
  const initYVel = Array.apply(null, Array(NUM_CIRCLES)).map(() => 0);
  const canvasRef = useRef(null);
  const xPos = useRef(initXPos);
  const yPos = useRef(initYPos);
  const xVel = useRef(initXVel);
  const yVel = useRef(initYVel);

  let animFrame = 0;

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, frameCount: number) => {
      ctx.fillStyle = "#fff";
      ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fill();
      for (let i = 0; i < NUM_CIRCLES; i++) {
        drawLetter(ctx, frameCount, i);
      }
    },
    []
  );

  const drawLetter = (
    ctx: CanvasRenderingContext2D,
    frameCount: number,
    circle: number
  ) => {
    ctx.fillStyle = "#000";
    ctx.font = "22px monospace";
    ctx.fillText(letters[circle], xPos.current[circle], yPos.current[circle]);
  };

  const update = (frameCount: number) => {
    for (let i = 0; i < NUM_CIRCLES; i++) {
      xPos.current[i] += xVel.current[i];
      yPos.current[i] += yVel.current[i];
      let xDelt = 0;
      let yDelt = 0;

      //Gravitate towards others
      for (let j = 0; j < NUM_CIRCLES; j++) {
        if (j != i) {
          xDelt += xPos.current[i] - xPos.current[j];
          yDelt += yPos.current[i] - yPos.current[j];
        }
      }
      // Factor in fixed points
      xDelt += xPos.current[i] - fixedPoints[i][0];
      yDelt += yPos.current[i] - fixedPoints[i][1];

      xVel.current[i] =
        Math.min(
          xVel.current[i] - Math.sign(xDelt) * Math.pow(xDelt / 200, 2),
          Math.max(MAX_SPEED - frameCount / 1000, 0)
        ) /
        ((1000000 + frameCount) / 1000000);
      yVel.current[i] =
        Math.min(
          yVel.current[i] - Math.sign(yDelt) * Math.pow(yDelt / 200, 2),
          Math.max(MAX_SPEED - frameCount / 1000, 0)
        ) /
        ((1000000 + frameCount) / 1000000);
    }
  };

  const driftToCenter = (context: CanvasRenderingContext2D) => {
    const canvasCenterX = context.canvas.width / 2;
    const canvasCenterY = context.canvas.height / 2;

    let xSum = 0;
    let ySum = 0;
    for (let i = 0; i < NUM_CIRCLES; i++) {
      xSum += xPos.current[i];
      ySum += yPos.current[i];
    }
    const xAvg = xSum / NUM_CIRCLES;
    const yAvg = ySum / NUM_CIRCLES;

    let xDelt = canvasCenterX - xAvg;
    let yDelt = canvasCenterY - yAvg;

    for (let i = 0; i < NUM_CIRCLES; i++) {
      xPos.current[i] += xDelt;
      yPos.current[i] += yDelt;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current as any;
    const context = canvas?.getContext("2d");
    if (context) {
      let animationFrameId: any;

      const render = () => {
        animFrame++;

        if (animFrame % 5 == 0 && animFrame < 10000) {
          draw(context, animFrame);
          driftToCenter(context);
          update(animFrame);
        }
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [animFrame, draw]);

  const nudge = () => {
    const canvas = canvasRef.current as any;
    const context = canvas?.getContext("2d");
    animFrame = 0;
    for (let i = 0; i < NUM_CIRCLES; i++) {
      xVel.current[i] = _.random(-3, 3);
      yVel.current[i] = _.random(-3, 3);
    }
    driftToCenter(context);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={nudge}
    >
      <canvas ref={canvasRef} width={200} height={100} />
    </div>
  );
};

export default AnimatedName;