import { useLocation } from "react-router-dom";

// https://reactrouter.com/web/example/query-parameters
// A custom hook that builds on useLocation to parse
// a query string for you
export default function useQuery() {
  return new URLSearchParams(useLocation().search);
}
