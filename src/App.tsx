import React, { useState } from 'react';

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

const App: React.FC = () => {
  const [board, setBoard] = useState(getInitialBoard());

  const startNewGame = () => setBoard(getInitialBoard());

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
