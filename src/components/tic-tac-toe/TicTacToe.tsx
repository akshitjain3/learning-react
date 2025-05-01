import { useEffect, useState } from "react";
import "./ttt.css";
import { MdOutlineRefresh } from "react-icons/md";

type shapeProps = {
  stroke?: string;
  fill?: string;
  classParam?: string;
};

const Circle = ({ stroke, fill, classParam }: shapeProps) => {
  return (
    <svg
      className={classParam}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        style={{ fill: fill, stroke: stroke, strokeWidth: "2.5" }}
      />
    </svg>
  );
};

const Close = ({ stroke, fill, classParam }: shapeProps) => {
  return (
    <svg
      className={classParam}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
        style={{ fill: fill, stroke: stroke, strokeWidth: "0.5" }}
      />
    </svg>
  );
};

export default function TicTacToe() {
  const [currPlayer, setcurrPlayer] = useState(true);
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: 3 }, () => Array(3).fill(0))
  );
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameDraw, setGameDraw] = useState(false);

  function checkGameOver() {
    for (let row = 0; row < 3; row++) {
      // row win
      if (
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2] &&
        board[row][0] !== 0
      ) {
        setGameOver(true);
        return;
      }
      // column win
      if (
        board[0][row] === board[1][row] &&
        board[1][row] === board[2][row] &&
        board[0][row] !== 0
      ) {
        setGameOver(true);
        return;
      }
    }

    // diagonal wins
    if (
      (board[0][0] === board[1][1] &&
        board[1][1] === board[2][2] &&
        board[0][0] !== 0) ||
      (board[0][2] === board[1][1] &&
        board[1][1] === board[2][0] &&
        board[0][2] !== 0)
    ) {
      setGameOver(true);
      return;
    }

    if (board.flat().find((cell) => cell === 0) === undefined) {
      setGameDraw(true);
      setGameOver(true);
      return;
    }
    setcurrPlayer((old) => !old);
  }

  function handleOnClick(row: number, col: number) {
    setBoard((old) => {
      let newBoard = [...old];
      newBoard[row] = [...old[row]];
      newBoard[row][col] = currPlayer ? 1 : 2;
      return newBoard;
    });
    console.log("test");
  }

  function handleRefresh() {
    setcurrPlayer(true);
    setBoard(Array.from({ length: 3 }, () => Array(3).fill(0)));
    setMessage("");
    setGameOver(false);
    setGameDraw(false);
  }

  useEffect(() => {
    if (board.flat().find((item) => item === 1 || item === 2) !== undefined)
      checkGameOver();
  }, [board]);

  useEffect(() => {
    gameOver
      ? gameDraw
        ? setMessage("Game Drawn.")
        : setMessage(
            `Congratulations you have won! Player ${currPlayer ? "X" : "O"}`
          )
      : null;
  }, [gameOver]);

  return (
    <div className="ttt-wrapper ">
      <h1>Tic Tac Toe</h1>
      <div
        className={
          "ttt-board " +
          (gameOver ? "" : currPlayer ? "custom-cursor-x" : "custom-cursor-0")
        }
      >
        {gameOver ? (
          <div className="ttt-gameover-screen">
            <h1
              style={{
                color: `${gameDraw ? null : currPlayer ? "blue" : "green"}`,
              }}
            >
              {message}
            </h1>
            <MdOutlineRefresh onClick={handleRefresh} />
          </div>
        ) : null}
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="ttt-row">
            {row.map((cell, colIndex) =>
              cell === 0 ? (
                <div
                  key={colIndex}
                  className={
                    "ttt-cell " + (currPlayer ? "x-player" : "o-player")
                  }
                  onClick={() => {
                    handleOnClick(rowIndex, colIndex);
                  }}
                ></div>
              ) : cell === 1 ? (
                <Close
                  key={colIndex}
                  classParam="ttt-cell-img"
                  fill="blue"
                  stroke="blue"
                />
              ) : (
                <Circle
                  key={colIndex}
                  classParam="ttt-cell-img"
                  fill="transparent"
                  stroke="green"
                />
              )
            )}
          </div>
        ))}
      </div>
      <div className="ttt-status">
        <h1>{!gameOver ? (currPlayer ? "X's Turn" : "O's Turn") : null}</h1>
      </div>
    </div>
  );
}
