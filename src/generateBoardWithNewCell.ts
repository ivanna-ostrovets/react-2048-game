import { Board } from './types';

const ROWS_QUANTITY = 4;
const CELLS_QUANTITY_PER_ROW = 4;

const getNewCellNumber = () => (Math.random() < 0.9 ? 2 : 4);

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max));

const getNewCellPosition = () => [
  getRandomInt(ROWS_QUANTITY),
  getRandomInt(CELLS_QUANTITY_PER_ROW),
];

export const generateBoardWithNewCell = (board: Board) => {
  const newBoard = [...board.map(row => [...row])] as Board;
  const newCellNumber = getNewCellNumber();
  let rowNumber, cellNumber;

  do {
    [rowNumber, cellNumber] = getNewCellPosition();
  } while (board[rowNumber][cellNumber] !== undefined);

  newBoard[rowNumber][cellNumber] = newCellNumber;

  return newBoard;
};
