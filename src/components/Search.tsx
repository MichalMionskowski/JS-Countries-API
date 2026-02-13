export function Search({ text, onText }) {
  return (
    <input
      type="text"
      onChange={(e) => onText(e.target.value)}
      value={text}
    ></input>
  );
}
