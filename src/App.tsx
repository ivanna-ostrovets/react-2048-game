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
  const [isGameOver, setGameOver] = useState(false);

  const startNewGame = () => setBoard(getInitialBoard());

  useEffect(() => {
    if (isGameOver) return;

    const handleKeyDown = ({ key }: KeyboardEvent) => {
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
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameOver]);

  useEffect(() => {
    let isFreeCell = false;

    board.forEach(row =>
      row.forEach(cell => {
        if (cell === undefined) isFreeCell = true;
        return;
      }),
    );

    setGameOver(!isFreeCell);
  }, [board]);

  return (
    <div className="app">
      <button onClick={startNewGame} className="button new-game-button">
        New Game
      </button>

      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <Cell key={`cell-${rowIndex}-${cellIndex}`} cell={cell} />
          )),
        )}

        {isGameOver && (
          <div className="game-over-overlay">
            <span className="game-over-text">Game Over!</span>

            <button onClick={startNewGame} className="button try-again-button">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
