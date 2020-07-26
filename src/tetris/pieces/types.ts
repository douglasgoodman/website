export interface PieceProps {
  piece: Piece;
  x: number;
  y: number;
  /** rotation should be a number 0 to 3 */
  rotation: number;
}

export enum Piece {
  I,
  J,
  L,
  O,
  S,
  T,
  Z,
}

export const PieceSize = [
  { piece: Piece.I, width: 4, height: 4 },
  { piece: Piece.J, width: 3, height: 3 },
  { piece: Piece.L, width: 3, height: 3 },
  { piece: Piece.O, width: 2, height: 2 },
  { piece: Piece.S, width: 3, height: 3 },
  { piece: Piece.T, width: 3, height: 3 },
  { piece: Piece.Z, width: 3, height: 3 },
];

const RotationStatesI = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
];

const RotationStatesJ = [
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
];

const RotationStatesL = [
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
];

const RotationStatesO = [
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
];

const RotationStatesS = [
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

const RotationStatesT = [
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

const RotationStatesZ = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ],
];

export const PieceStates = [
  { piece: Piece.I, states: RotationStatesI },
  { piece: Piece.J, states: RotationStatesJ },
  { piece: Piece.L, states: RotationStatesL },
  { piece: Piece.O, states: RotationStatesO },
  { piece: Piece.S, states: RotationStatesS },
  { piece: Piece.T, states: RotationStatesT },
  { piece: Piece.Z, states: RotationStatesZ },
];

export const PieceColors = [
  { piece: Piece.J, color: 1 },
  { piece: Piece.L, color: 2 },
  { piece: Piece.I, color: 3 },
  { piece: Piece.O, color: 4 },
  { piece: Piece.S, color: 5 },
  { piece: Piece.T, color: 6 },
  { piece: Piece.Z, color: 7 },
];
