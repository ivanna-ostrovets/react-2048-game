import isEqual from 'lodash/isEqual';
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

const transposeBoard = board =>
  board[0].map((col, i) => board.map(row => row[i]));

const getNonEmptyCells = seq => seq.filter(cell => cell !== undefined);

// TODO: pure func
// TODO: types
const sumCells = seq => {
  seq.forEach((cell, index, array) => {
    if (cell === undefined || array[index + 1] === undefined) return;

    if (cell === array[index + 1]) {
      array[index] = cell * 2;
      array[index + 1] = undefined;
    }
  });

  return seq;
};

const makeMoveOnSequence = seq => {
  if (seq.every(cell => cell === undefined)) return seq;

  const newSeq = getNonEmptyCells(sumCells(getNonEmptyCells(seq)));
  const emptyCellsQuantity = seq.length - newSeq.length;

  return newSeq.concat(...Array(emptyCellsQuantity));
};

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
            const transposedBoard = transposeBoard(prevBoard);
            const boardAfterMove = transposedBoard.map(makeMoveOnSequence);

            if (isEqual(transposedBoard, boardAfterMove)) return prevBoard;

            return generateBoardWithNewCell(
              transposeBoard(boardAfterMove) as Board,
            );
          });

          break;
        }
        case 'ArrowDown': {
          setBoard(prevBoard => {
            const transposedBoard = transposeBoard(prevBoard);
            const boardAfterMove = transposedBoard.map(col =>
              makeMoveOnSequence(col.slice().reverse())
                .slice()
                .reverse(),
            );

            if (isEqual(prevBoard, boardAfterMove)) return prevBoard;

            return generateBoardWithNewCell(
              transposeBoard(boardAfterMove) as Board,
            );
          });

          break;
        }
        case 'ArrowLeft': {
          setBoard(prevBoard => {
            const boardAfterMove = prevBoard.map(makeMoveOnSequence) as Board;

            if (isEqual(prevBoard, boardAfterMove)) return prevBoard;

            return generateBoardWithNewCell(boardAfterMove);
          });

          break;
        }
        case 'ArrowRight': {
          setBoard(prevBoard => {
            const boardAfterMove = prevBoard.map(row =>
              makeMoveOnSequence(row.slice().reverse())
                .slice()
                .reverse(),
            );

            if (isEqual(prevBoard, boardAfterMove)) return prevBoard;

            return generateBoardWithNewCell(boardAfterMove as Board);
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
