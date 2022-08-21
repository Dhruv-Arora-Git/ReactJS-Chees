import { useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";
import Refree from "../../refree/Refree";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  horizontalPosition: number;
  verticalPosition: number;
  type: PieceType;
  player: PlayerType;
}

export enum PlayerType {
  WHITE,
  BLACK,
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

const initialPieces: Piece[] = [];
for (let i = 0; i < 2; i++) {
  const player = i === 0 ? PlayerType.BLACK : PlayerType.WHITE;
  const color = player === PlayerType.BLACK ? "b" : "w";
  const verticalPos = player === PlayerType.BLACK ? 7 : 0;
  // rooks
  initialPieces.push({
    image: `assets/images/rook_${color}.svg`,
    horizontalPosition: 0,
    verticalPosition: verticalPos,
    type: PieceType.ROOK,
    player,
  });
  initialPieces.push({
    image: `assets/images/rook_${color}.svg`,
    horizontalPosition: 7,
    verticalPosition: verticalPos,
    type: PieceType.ROOK,
    player,
  });
  // knights
  initialPieces.push({
    image: `assets/images/knight_${color}.svg`,
    horizontalPosition: 1,
    verticalPosition: verticalPos,
    type: PieceType.KNIGHT,
    player,
  });
  initialPieces.push({
    image: `assets/images/knight_${color}.svg`,
    horizontalPosition: 6,
    verticalPosition: verticalPos,
    type: PieceType.KNIGHT,
    player,
  });

  // bishops
  initialPieces.push({
    image: `assets/images/bishop_${color}.svg`,
    horizontalPosition: 2,
    verticalPosition: verticalPos,
    type: PieceType.BISHOP,
    player,
  });
  initialPieces.push({
    image: `assets/images/bishop_${color}.svg`,
    horizontalPosition: 5,
    verticalPosition: verticalPos,
    type: PieceType.BISHOP,
    player,
  });
  // king
  initialPieces.push({
    image: `assets/images/king_${color}.svg`,
    horizontalPosition: 4,
    verticalPosition: verticalPos,
    type: PieceType.KING,
    player,
  });
  // queen
  initialPieces.push({
    image: `assets/images/queen_${color}.svg`,
    horizontalPosition: 3,
    verticalPosition: verticalPos,
    type: PieceType.QUEEN,
    player,
  });
}

// pawns - black
for (let i = 0; i < 8; i++) {
  initialPieces.push({
    image: "assets/images/pawn_b.svg",
    horizontalPosition: i,
    verticalPosition: 6,
    type: PieceType.PAWN,
    player: PlayerType.BLACK,
  });
}

// pawns - white
for (let i = 0; i < 8; i++) {
  initialPieces.push({
    image: "assets/images/pawn_w.svg",
    horizontalPosition: i,
    verticalPosition: 1,
    type: PieceType.PAWN,
    player: PlayerType.WHITE,
  });
}

export default function ChessBoard() {
  let board = [];
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [pieces, setPieces] = useState<Piece[]>(initialPieces);
  const chessBoardRef = useRef<HTMLDivElement>(null);

  const refree = new Refree();

  function grabPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const element = e.target as HTMLDivElement;
    const chessboard = chessBoardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
      );
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
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
    }
  }

  function dropPiece(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const chessboard = chessBoardRef.current;

    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100)
      );

      // Updates the piece's position
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.horizontalPosition === gridX && p.verticalPosition === gridY) {
            const validMode = refree.isValidMove(
              gridX,
              gridY,
              x,
              y,
              p.type,
              p.player
            );
            if (validMode) {
              p.horizontalPosition = x;
              p.verticalPosition = y;
            } else {
              activePiece.style.position = "relative";
              activePiece.style.left = "0px";
              activePiece.style.top = "0px";
            }
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
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
