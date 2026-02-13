import { Link } from "react-router-dom";

export function ErrorScreen() {
  return (
    <div className="flex flex-col gap-2">
      <div>404 Not found</div>
      <Link to="/">Route back to countries</Link>
    </div>
  );
}
