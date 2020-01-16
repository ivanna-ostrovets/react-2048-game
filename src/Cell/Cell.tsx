import React from 'react';

import { CellType } from '../App';
import './Cell.css';

interface Props {
  cell: CellType;
}

const Cell: React.FC<Props> = ({ cell }: Props) => {
  return <div className="cell">{cell}</div>;
};

export default Cell;
