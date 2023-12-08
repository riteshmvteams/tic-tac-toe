import { useEffect, useRef, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";

const playedArray = [];
const box = 3;

Array.from({ length: box * box }).map((_, i) => {
  return playedArray.push(null);
});

const allEqual = (arr) => {
  return arr.every((val) => {
    if (val === null) return false;
    return val === arr[0];
  });
};

const checkGameWinner = (length) => {
  const result1 = checkHorizontalWinner(length);
  const result2 = checkVerticalWinner(length);
  const result3 = checkDiagonally(length);

  return result1 || result2 || result3;
};

const checkHorizontalWinner = () => {
  const arr1 = [];
  const arr2 = [];
  const arr3 = [];

  for (let i = 0; i < 3; i++) {
    arr1.push(playedArray[0 + i]);
    arr2.push(playedArray[3 + i]);
    arr3.push(playedArray[6 + i]);
  }

  const res1 = allEqual(arr1);
  const res2 = allEqual(arr2);
  const res3 = allEqual(arr3);

  return res1 || res2 || res3;
};

const checkVerticalWinner = () => {
  const arr1 = [];
  const arr2 = [];
  const arr3 = [];

  for (let i = 0; i < 3; i++) {
    arr1.push(playedArray[0 + 3 * i]);
    arr2.push(playedArray[1 + 3 * i]);
    arr3.push(playedArray[2 + 3 * i]);
  }

  const res1 = allEqual(arr1);
  const res2 = allEqual(arr2);
  const res3 = allEqual(arr3);

  return res1 || res2 || res3;
};

const checkDiagonally = () => {
  const arr1 = [];
  const arr2 = [];

  for (let i = 0; i < 3; i++) {
    arr1.push(playedArray[0 + i * 4]);
    arr2.push(playedArray[2 * (i + 1)]);
  }

  const res1 = allEqual(arr1);
  const res2 = allEqual(arr2);

  return res1 || res2;
};

export default function App() {
  const [turn, setTurn] = useState(false);
  const [isPlayer, setIsPlayer] = useState(true);
  const [show, setShow] = useState(false);
  const boxRef = useRef();
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (turn && !isPlayer) {
        const childrens = boxRef.current.children;

        const filtered = [...childrens].filter((el) => {
          return el.textContent === "";
        });
        const length = filtered.length;

        if (length === 0) return;

        filtered[Math.floor(Math.random() * length)].click();
      }
    }, 500);
  }, [turn, isPlayer]);

  return (
    <>
      <div>
        <ul
          ref={boxRef}
          className="game__board"
          style={{
            gridTemplateColumns: `repeat(${box}, 1fr)`,
            gridTemplateRows: `repeat(${box}, 1fr)`,
          }}
        >
          {playedArray.map((_, i) => {
            return (
              <Box
                setShow={setShow}
                turn={turn}
                setTurn={setTurn}
                key={i}
                index={i}
                setDraw={setDraw}
              />
            );
          })}
        </ul>
      </div>
      <Modal show={show} setShow={setShow}>
        <div>
          {draw && "Ye le Ho gya Draw. *******ye"}

          {!draw && !turn
            ? "Raghu *****ya Lost (X Winner)"
            : "Raghu *****ya winner ( O winner)"}
        </div>
      </Modal>
    </>
  );
}

const Box = ({ turn, setTurn, index, setShow, setDraw }) => {
  const [player, setPlayer] = useState(null);

  const handlePlayer = (ind) => {
    if (player) return;

    const curPlayer = turn ? "X" : "O";
    setPlayer(curPlayer);
    playedArray[ind] = curPlayer;
    setTurn((prev) => !prev);

    const finalResult = checkGameWinner(box);

    if (finalResult) {
      console.log(`${curPlayer} is the winner`);
      setShow(true);
    }

    const drawResult = playedArray.every((el) => {
      return el !== null;
    });

    if (!finalResult && drawResult) {
      setShow(true);
      setDraw(true);
      console.log("Math Drawn");
    }
  };

  return (
    <li className="game__board--box" onClick={() => handlePlayer(index)}>
      {player}
    </li>
  );
};
