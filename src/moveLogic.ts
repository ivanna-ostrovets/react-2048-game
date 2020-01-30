import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import zip from 'lodash/zip';

import { generateBoardWithNewCell } from './generateBoardWithNewCell';
import { Board } from './types';

export const transposeBoard = board => zip(...board);

const getNonEmptyCells = seq => seq.filter(cell => cell.value !== undefined);

const getEmptyCells = seq => seq.filter(cell => cell.value === undefined);

// TODO: pure func
// TODO: types
const sumCells = seq => {
  const newSequence = cloneDeep(seq);

  newSequence.forEach((cell, index, array) => {
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

  return newSequence;
};

export const makeMoveOnSequence = seq => {
  if (seq.every(cell => cell.value === undefined)) return seq;

  const emptyCells = getEmptyCells(seq);
  const newSeq = sumCells(getNonEmptyCells(seq));

  return getNonEmptyCells(newSeq).concat(getEmptyCells(newSeq), emptyCells);
};

export const makeMove = (
  board: Board,
  {
    isVerticalMove,
    isReversedOrder,
  }: { isVerticalMove?: boolean; isReversedOrder?: boolean } = {},
) => {
  const transformedBoard = isVerticalMove ? transposeBoard(board) : board;
  const boardAfterMove = isReversedOrder
    ? transformedBoard.map(col =>
        makeMoveOnSequence(col.slice().reverse())
          .slice()
          .reverse(),
      )
    : transformedBoard.map(makeMoveOnSequence);

  if (isEqual(transformedBoard, boardAfterMove)) return board;

  return generateBoardWithNewCell(
    isVerticalMove ? transposeBoard(boardAfterMove) : boardAfterMove,
  );
};
