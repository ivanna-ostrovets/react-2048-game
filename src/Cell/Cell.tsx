import React from 'react';

import { CellType } from '../types';
import './Cell.css';

interface Props {
  cell: CellType;
}

const Cell: React.FC<Props> = ({ cell }: Props) => {
  return <div className="cell">{cell.value}</div>;
};

export default Cell;
