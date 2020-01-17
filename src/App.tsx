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

const App: React.FC = () => {
  const [board, setBoard] = useState(
    generateBoardWithNewCell(generateBoardWithNewCell(INITIAL_BOARD_STATE)),
  );

  return (
    <div className="app">
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
