import * as React from "react";
import type { NextPage } from "next";
import styles from "../styles/TextSel.module.css";
import Layout from "../c/Layout";
import _ from "lodash";

const blurb =
  "This is just some text to use for the sampling and selection of stuff. Don't take it too serious. In fact, it's not even that great, it's just a bunch of words strung together, to make sentences, which in turn form paragraphs. Those paragraphs make up a narrative, and that narrative is my life.";

const MAX_SELECTIONS = 3;
const SEL_COLORS = ["#BECBD7", "#D7BED0", "#DFA39F"];

const TextSel: NextPage = () => {
  const initSelections = Array(MAX_SELECTIONS).fill([-1, -1]);
  const [selections, setSelections] = React.useState(initSelections);
  const [selIndex, setSelIndex] = React.useState(0);

  const [selectionState, setSelectionState] =
    React.useState("nothing_selected");
  const [selection, setSelection] = React.useState([-1, -1]);
  const words = _.split(blurb, " ");

  const onClickSpace = (index: number) => {
    // if (isInSelectionInner(index)) {
    //   cancelSelection();
    // }
  };

  const isInSelection = React.useCallback(
    (wordIndex: number, selIndex: number) => {
      return (
        wordIndex >= selections[selIndex][0] &&
        wordIndex <= selections[selIndex][1]
      );
    },
    [selections]
  );

  const isOverlappingInterval = React.useCallback(
    (selIndexTarget: number, startWordIndex: number, endWordIndex: number) => {
      for (let i = 0; i < MAX_SELECTIONS; i++) {
        if (i !== selIndexTarget) {
          if (
            isInSelection(startWordIndex, i) ||
            isInSelection(endWordIndex, i)
          ) {
            return true;
          }
          if (
            startWordIndex < selections[i][0] &&
            endWordIndex > selections[i][1]
          ) {
            return true;
          }
        }
      }
      return false;
    },
    [isInSelection, selections]
  );

  const assignSelection = React.useCallback(
    (selIndexTarget: number, selection: number[]) => {
      let newSelections = [...selections];
      newSelections[selIndexTarget] = selection;
      console.log("new selections are", newSelections);
      setSelections(newSelections);
    },
    [selections]
  );

  const cancelSelection = React.useCallback(
    (selIndexTarget: number) => {
      // let newSelections = [...selections];
      // newSelections[selIndex] = [-1, -1];
      // setSelections(newSelections);
      console.log("in cancel");
      assignSelection(selIndexTarget, [-1, -1]);
      setSelectionState("nothing_selected");
    },
    [assignSelection]
  );

  const findSelection = React.useCallback(
    (wordIndex: number) => {
      for (let i = 0; i < MAX_SELECTIONS; i++) {
        if (isInSelection(wordIndex, i)) {
          return { selIndex: i, found: true };
        }
      }
      return { selIndex: 0, found: false };
    },
    [isInSelection]
  );

  const isInSelectionInner = (index: number) => {
    return index >= selection[0] && index < selection[1];
  };

  const getBgColorForSelection = React.useCallback(
    (wordIndex: number) => {
      const inSelection = findSelection(wordIndex);
      if (inSelection.found) {
        return SEL_COLORS[inSelection.selIndex];
      }
      return "none";
    },
    [findSelection]
  );

  const onClickWord = React.useCallback(
    (wordIndex: number) => {
      if (selectionState == "nothing_selected") {
        const inSelection = findSelection(wordIndex);
        if (inSelection.found) {
          cancelSelection(inSelection.selIndex);
          return;
        }

        assignSelection(selIndex, [wordIndex, wordIndex]);
        setSelectionState("first_selected");
        return;
      }
      if (selectionState == "first_selected") {
        if (wordIndex > selections[selIndex][0]) {
          if (
            isOverlappingInterval(selIndex, selections[selIndex][0], wordIndex)
          ) {
            return;
          }
          assignSelection(selIndex, [selections[selIndex][0], wordIndex]);
        } else {
          if (
            isOverlappingInterval(selIndex, wordIndex, selections[selIndex][0])
          ) {
            return;
          }
          assignSelection(selIndex, [wordIndex, selections[selIndex][0]]);
        }
        setSelectionState("nothing_selected");
        const newSelIndex = (selIndex + 1) % MAX_SELECTIONS;
        console.log("sel index is now ", newSelIndex);
        setSelIndex(newSelIndex);
      }
    },
    [
      assignSelection,
      cancelSelection,
      findSelection,
      isOverlappingInterval,
      selIndex,
      selectionState,
      selections,
    ]
  );

  const renderWords = React.useCallback(() => {
    return words.map((word: string, index: number) => {
      return (
        <span key={index}>
          <span
            className={styles.word}
            onClick={() => onClickWord(index)}
            style={{ backgroundColor: getBgColorForSelection(index) }}
          >
            {word}
          </span>
          <span
            className={styles.space}
            // onClick={() => onClickSpace(index)}
            style={{
              backgroundColor: getBgColorForSelection(index),
            }}
          >
            {" "}
          </span>
        </span>
      );
    });
  }, [getBgColorForSelection, onClickWord, words]);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 400 }}>{renderWords()}</div>
      </div>
    </Layout>
  );
};

export default TextSel;
