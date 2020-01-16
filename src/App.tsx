import React, { useState } from 'react';

import Cell from './Cell/Cell';
import './App.css';

export type CellType = number | undefined;

type Board = [
  [CellType, CellType, CellType, CellType],
  [CellType, CellType, CellType, CellType],
  [CellType, CellType, CellType, CellType],
  [CellType, CellType, CellType, CellType],
];

const INITIAL_BOARD_STATE: Board = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
];

const App: React.FC = () => {
  const [board, setBoard] = useState(INITIAL_BOARD_STATE);

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
