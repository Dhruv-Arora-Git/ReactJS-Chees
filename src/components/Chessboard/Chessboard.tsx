import { useRef } from "react";
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

export default function ChessBoard() {
  let board = [];
  const chessBoardRef = useRef<HTMLDivElement>(null);

  let activePiece: HTMLElement | null = null;

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const element = e.target as HTMLDivElement;
    if (element.classList.contains("chess-piece")) {
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      activePiece = element;
    }
  }

  function movePiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const chessBoard = chessBoardRef.current;

    if (activePiece && chessBoard) {
      const minX = chessBoard.offsetLeft - 20;
      const minY = chessBoard.offsetTop - 20;
      const maxX = chessBoard.offsetLeft + chessBoard.clientWidth - 75;
      const maxY = chessBoard.offsetTop + chessBoard.clientHeight - 85;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }

      // activePiece.style.left =
      //   x < minX ? `${minX}px` : x > maxX ? `${maxX}px` : `${x}`;
      // activePiece.style.top =
      //   y < minY ? `${minY}px` : y > maxY ? `${maxY}` : `${y}px`;
    }
  }

  function dropPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (activePiece) {
      activePiece = null;
    }
  }

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
      ref={chessBoardRef}
    >
      {board}
    </div>
  );
}
