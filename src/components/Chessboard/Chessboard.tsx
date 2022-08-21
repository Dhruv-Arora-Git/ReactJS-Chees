import Tile from "../Tile/Tile";
import "./Chessboard.css";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  horizontalPosition: number;
  verticalPosition: number;
}

const pieces: Piece[] = [];

for (let i = 0; i < 2; i++) {
  const color = i === 0 ? "b" : "w";
  const verticalPos = i === 0 ? 7 : 0;
  // rooks
  pieces.push({
    image: `assets/images/rook_${color}.svg`,
    horizontalPosition: 0,
    verticalPosition: verticalPos,
  });
  pieces.push({
    image: `assets/images/rook_${color}.svg`,
    horizontalPosition: 7,
    verticalPosition: verticalPos,
  });
  // knights
  pieces.push({
    image: `assets/images/knight_${color}.svg`,
    horizontalPosition: 1,
    verticalPosition: verticalPos,
  });
  pieces.push({
    image: `assets/images/knight_${color}.svg`,
    horizontalPosition: 6,
    verticalPosition: verticalPos,
  });

  // bishops
  pieces.push({
    image: `assets/images/bishop_${color}.svg`,
    horizontalPosition: 2,
    verticalPosition: verticalPos,
  });
  pieces.push({
    image: `assets/images/bishop_${color}.svg`,
    horizontalPosition: 5,
    verticalPosition: verticalPos,
  });
  // king
  pieces.push({
    image: `assets/images/king_${color}.svg`,
    horizontalPosition: 4,
    verticalPosition: verticalPos,
  });
  // queen
  pieces.push({
    image: `assets/images/queen_${color}.svg`,
    horizontalPosition: 3,
    verticalPosition: verticalPos,
  });
}

// pawns - black
for (let i = 0; i < 8; i++) {
  pieces.push({
    image: "assets/images/pawn_b.svg",
    horizontalPosition: i,
    verticalPosition: 6,
  });
}

// pawns - white
for (let i = 0; i < 8; i++) {
  pieces.push({
    image: "assets/images/pawn_w.svg",
    horizontalPosition: i,
    verticalPosition: 1,
  });
}

let activePiece: HTMLElement | null = null;

function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  // console.log(e.target);
  const element = e.target as HTMLDivElement;
  if (element.classList.contains("chess-piece")) {
    console.log(element);

    const x = e.clientX - 50;
    const y = e.clientY - 50;
    element.style.position = "absolute";
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

    activePiece = element;
  }
}

function movePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  if (activePiece) {
    console.log(activePiece);

    const x = e.clientX - 50;
    const y = e.clientY - 50;
    activePiece.style.position = "absolute";
    activePiece.style.left = `${x}px`;
    activePiece.style.top = `${y}px`;
  }
}

function dropPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  if (activePiece) {
    activePiece = null;
  }
}

export default function chessBoard() {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = i + j + 2;
      let image = undefined;
      pieces.forEach((piece) => {
        if (piece.horizontalPosition === i && piece.verticalPosition === j) {
          image = piece.image;
        }
      });

      board.push(<Tile key={`${j},${i}`} image={image} coords={number} />);
    }
  }
  return (
    <div
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
    >
      {board}
    </div>
  );
}
