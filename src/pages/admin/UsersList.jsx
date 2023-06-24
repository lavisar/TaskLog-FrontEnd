import { useGetUsersQuery } from "../../store/apis/usersApi";

function UsersList() {
  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery();
  console.log(data);

  let content;
  if (isLoading) {
    content = <p>Loading</p>;
  } else if (isSuccess) {
    content = (
      <section>

      </section>
    )
  }

  return content;
}

export default UsersList;