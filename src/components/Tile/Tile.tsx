import "./Tile.css";

export default function Tile(props: { coords: number; image?: string }) {
  if (props.coords % 2 === 0) {
    return (
      <div className="tile black-tile">
        {props.image && (
          <div
            className="chess-piece"
            style={{ backgroundImage: `url(${props.image})` }}
          ></div>
        )}
      </div>
    );
  }
  return (
    <div className="tile white-tile">
      {props.image && (
        <div
          className="chess-piece"
          style={{ backgroundImage: `url(${props.image})` }}
        ></div>
      )}
    </div>
  );
}
