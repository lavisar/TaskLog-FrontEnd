import { useParams } from "react-router-dom";

export default function ManageAccount() {
  const { accountId } = useParams();
  return <div>
    {accountId}
  </div>;
}
