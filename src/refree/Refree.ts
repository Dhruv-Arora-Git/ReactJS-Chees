import { PieceType, PlayerType } from "../components/Chessboard/Chessboard";

export default class Refree {
  isValidMove(
    prevX: number,
    prevY: number,
    nextX: number,
    nextY: number,
    type: PieceType,
    player: PlayerType
  ) {
    // console.log("Refree is here!");
    console.log("previous: " + prevX + " " + prevY);
    console.log("next: " + nextX + " " + nextY);
    // console.log("type: " + type);
    // console.log("player: " + player);

    if (type === PieceType.PAWN) {
      if (player === PlayerType.WHITE) {
        if (prevY === 1) {
          if (nextY === 2 || nextY === 3) {
            console.log("pawn can move to " + nextX + " " + nextY);
            return true;
          }
        } else if (nextY === prevY + 1 && nextX === prevX) {
          return true;
        }
      }
    }
    return false;
  }
}
