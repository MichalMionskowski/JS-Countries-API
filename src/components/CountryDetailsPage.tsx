import { useParams } from "react-router-dom";

export function CountryDetailsPage() {
  const params = useParams();
  return <>DETAILS PAGE {params.name}</>;
}
