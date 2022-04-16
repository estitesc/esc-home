import * as React from "react";
import type { NextPage } from "next";
import styles from "../styles/TextSel.module.css";
import Layout from "../c/Layout";
import _ from "lodash";

const blurb =
  "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.--That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed, --That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government, laying its foundation on such principles and organizing its powers in such form, as to them shall seem most likely to effect their Safety and Happiness. Prudence, indeed, will dictate that Governments long established should not be changed for light and transient causes; and accordingly all experience hath shewn, that mankind are more disposed to suffer, while evils are sufferable, than to right themselves by abolishing the forms to which they are accustomed. But when a long train of abuses and usurpations, pursuing invariably the same Object evinces a design to reduce them under absolute Despotism, it is their right, it is their duty, to throw off such Government, and to provide new Guards for their future security.--Such has been the patient sufferance of these Colonies; and such is now the necessity which constrains them to alter their former Systems of Government. The history of the present King of Great Britain is a history of repeated injuries and usurpations, all having in direct object the establishment of an absolute Tyranny over these States. To prove this, let Facts be submitted to a candid world.";

const MAX_SELECTIONS = 9;
const SEL_COLORS = [
  "#BECBD7",
  "#D7BED0",
  "#DFA39F",
  "#BECBD7",
  "#D7BED0",
  "#DFA39F",
  "#BECBD7",
  "#D7BED0",
  "#DFA39F",
];
const MAX_WORDS = 24;

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

  const getWordsSelectedCount = React.useCallback(() => {
    let wordsSelected = 0;
    for (let i = 0; i < MAX_SELECTIONS; i++) {
      if (selections[i][0] >= 0) {
        wordsSelected += 1 + selections[i][1] - selections[i][0];
      }
    }
    return wordsSelected;
  }, [selections]);

  const onClickWord = React.useCallback(
    (wordIndex: number) => {
      if (selectionState == "nothing_selected") {
        const inSelection = findSelection(wordIndex);
        if (inSelection.found) {
          cancelSelection(inSelection.selIndex);
          return;
        }

        if (getWordsSelectedCount() > MAX_WORDS) {
          // Don't start a new selection if you already have too many words.
          return;
        }

        assignSelection(selIndex, [wordIndex, wordIndex]);
        setSelectionState("first_selected");
        return;
      }
      if (selectionState == "first_selected") {
        // Don't complete selection if it would exceed max words count.
        const diff = wordIndex - selections[selIndex][0];
        if (Math.abs(diff) + getWordsSelectedCount() > MAX_WORDS) {
          return;
        }

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
      getWordsSelectedCount,
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

  const renderConcat = () => {
    let concat = "";

    //sort them.
    const sortedSelections = _.sortBy(
      [...selections],
      (selection: any) => selection[0]
    );

    sortedSelections.forEach((selection: any) => {
      if (selection[0] >= 0) {
        const wordsFromSel = words.slice(selection[0], selection[1] + 1);
        concat += wordsFromSel.join(" ");
        concat += " ";
      }
    });

    return concat;
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 600 }}>
          <div>{renderWords()}</div>
          <div style={{ marginTop: 12, fontWeight: "bold" }}>
            {renderConcat()}
          </div>
          <div style={{ marginTop: 12 }}>
            Words Remaining: {MAX_WORDS - getWordsSelectedCount()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextSel;
