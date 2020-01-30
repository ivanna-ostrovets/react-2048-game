import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';

import './App.css';
import Cell from './Cell/Cell';
import { generateBoardWithNewCell } from './generateBoardWithNewCell';
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

const transposeBoard = board =>
  board[0].map((col, i) => board.map(row => row[i]));

const getNonEmptyCells = seq => seq.filter(cell => cell.value !== undefined);

const getEmptyCells = seq => seq.filter(cell => cell.value === undefined);

// TODO: pure func
// TODO: types
const sumCells = seq => {
  seq.forEach((cell, index, array) => {
    if (
      cell.value === undefined ||
      array[index + 1] === undefined ||
      array[index + 1].value === undefined
    ) {
      return;
    }

    if (cell.value === array[index + 1].value) {
      array[index].value = cell.value * 2;
      array[index + 1].value = undefined;
    }
  });

  return seq;
};

const makeMoveOnSequence = seq => {
  if (seq.every(cell => cell.value === undefined)) return seq;

  const emptyCells = getEmptyCells(seq);
  const newSeq = sumCells(getNonEmptyCells(seq));

  return getNonEmptyCells(newSeq).concat(getEmptyCells(newSeq), emptyCells);
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
            const boardAfterMove = cloneDeep(transposedBoard).map(
              makeMoveOnSequence,
            );

            if (isEqual(transposedBoard, boardAfterMove)) return prevBoard;

            return generateBoardWithNewCell(transposeBoard(boardAfterMove));
          });

          break;
        }
        case 'ArrowDown': {
          setBoard(prevBoard => {
            const transposedBoard = transposeBoard(prevBoard);
            const boardAfterMove = cloneDeep(transposedBoard).map(col =>
              makeMoveOnSequence(col.slice().reverse())
                .slice()
                .reverse(),
            );

            if (isEqual(transposedBoard, boardAfterMove)) return prevBoard;

            return generateBoardWithNewCell(transposeBoard(boardAfterMove));
          });

          break;
        }
        case 'ArrowLeft': {
          setBoard(prevBoard => {
            const boardAfterMove = cloneDeep(prevBoard).map(
              makeMoveOnSequence,
            ) as Board;

            if (isEqual(prevBoard, boardAfterMove)) return prevBoard;

            return generateBoardWithNewCell(boardAfterMove);
          });

          break;
        }
        case 'ArrowRight': {
          setBoard(prevBoard => {
            const boardAfterMove = cloneDeep(prevBoard).map(row =>
              makeMoveOnSequence(row.slice().reverse())
                .slice()
                .reverse(),
            );

            if (isEqual(prevBoard, boardAfterMove)) return prevBoard;

            return generateBoardWithNewCell(boardAfterMove);
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
