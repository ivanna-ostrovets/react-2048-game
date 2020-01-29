import React, { useEffect, useState } from 'react';

import './App.css';
import Cell from './Cell/Cell';
import { generateBoardWithNewCell } from './generateBoardWithNewCell';
import { Board } from './types';

const INITIAL_BOARD_STATE: Board = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
];

const getInitialBoard = () =>
  generateBoardWithNewCell(generateBoardWithNewCell(INITIAL_BOARD_STATE));

const INITIAL_BOARD = getInitialBoard();

const App: React.FC = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);

  const startNewGame = () => setBoard(getInitialBoard());

  function handleKeyDown({ key }: KeyboardEvent) {
    switch (key) {
      case 'ArrowUp': {
        setBoard(prevBoard => generateBoardWithNewCell(prevBoard));
        break;
      }
      case 'ArrowDown': {
        setBoard(prevBoard => generateBoardWithNewCell(prevBoard));
        break;
      }
      case 'ArrowLeft': {
        setBoard(prevBoard => generateBoardWithNewCell(prevBoard));
        break;
      }
      case 'ArrowRight': {
        setBoard(prevBoard => generateBoardWithNewCell(prevBoard));
        break;
      }
      default: {
        break;
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="app">
      <button onClick={startNewGame} className="new-game-button">
        New Game
      </button>

      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <Cell key={`cell-${rowIndex}-${cellIndex}`} cell={cell} />
          )),
        )}
      </div>
    </div>
  );
};

export default App;
