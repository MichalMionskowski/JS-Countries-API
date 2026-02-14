export function Search({ text, onText }) {
  return (
    <div>
      <text style={{ paddingRight: 10 }}>Search Country</text>
      <input
        className="border-1 border-solid"
        type="text"
        onChange={(e) => onText(e.target.value)}
        value={text}
      ></input>
    </div>
  );
}
