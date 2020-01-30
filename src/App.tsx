import React, { useEffect, useState } from 'react';

import './App.css';
import Cell from './Cell/Cell';
import { generateBoardWithNewCell } from './generateBoardWithNewCell';
import { makeMove } from './moveLogic';
import { Board } from './types';

const INITIAL_BOARD_STATE: Board = [
  [
    { value: undefined, key: 'cell-0-0' },
    { value: undefined, key: 'cell-0-1' },
    { value: undefined, key: 'cell-0-2' },
    { value: undefined, key: 'cell-0-3' },
  ],
  [
    { value: undefined, key: 'cell-1-0' },
    { value: undefined, key: 'cell-1-1' },
    { value: undefined, key: 'cell-1-2' },
    { value: undefined, key: 'cell-1-3' },
  ],
  [
    { value: undefined, key: 'cell-2-0' },
    { value: undefined, key: 'cell-2-1' },
    { value: undefined, key: 'cell-2-2' },
    { value: undefined, key: 'cell-2-3' },
  ],
  [
    { value: undefined, key: 'cell-3-0' },
    { value: undefined, key: 'cell-3-1' },
    { value: undefined, key: 'cell-3-2' },
    { value: undefined, key: 'cell-3-3' },
  ],
];

const getInitialBoard = () =>
  generateBoardWithNewCell(generateBoardWithNewCell(INITIAL_BOARD_STATE));

const FIRST_GENERATED_BOARD = getInitialBoard();

const App: React.FC = () => {
  const [board, setBoard] = useState(FIRST_GENERATED_BOARD);
  const [isGameOver, setGameOver] = useState(false);

  const startNewGame = () => setBoard(getInitialBoard());

  useEffect(() => {
    if (isGameOver) return;

    const handleKeyDown = ({ key }: KeyboardEvent) => {
      switch (key) {
        case 'ArrowUp': {
          setBoard(prevBoard => {
            return makeMove(prevBoard, { isVerticalMove: true });
          });

          break;
        }
        case 'ArrowDown': {
          setBoard(prevBoard => {
            return makeMove(prevBoard, {
              isVerticalMove: true,
              isReversedOrder: true,
            });
          });

          break;
        }
        case 'ArrowLeft': {
          setBoard(prevBoard => {
            return makeMove(prevBoard);
          });

          break;
        }
        case 'ArrowRight': {
          setBoard(prevBoard => {
            return makeMove(prevBoard, {
              isReversedOrder: true,
            });
          });

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
        if (cell.value === undefined) isFreeCell = true;
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
        {board.map(row => row.map(cell => <Cell key={cell.key} cell={cell} />))}

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
