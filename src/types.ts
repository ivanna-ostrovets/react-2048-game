export type CellType = {
  value: number | undefined;
  key: string;
};

export type Board = [
  [CellType, CellType, CellType, CellType],
  [CellType, CellType, CellType, CellType],
  [CellType, CellType, CellType, CellType],
  [CellType, CellType, CellType, CellType],
];
