import CustomGrid from "../../components/table/CustomGrid";
import { useGetAllUsersQuery } from "../../store";
import { API_INSTANCE } from "../../store/apis/features/apisConst";

function UsersList() {
  const { data, isLoading, isSuccess, isError, error } = useGetAllUsersQuery();
  console.log(data);
  let content;
  if (isLoading) {
    content = <p>Loading</p>;
  } else if (isSuccess) {
    const config = [
      {
        id: 'id',
        label: "Id",
      },
      {
        id: 'username',
        label: "Username",
      },
      {
        id: 'email',
        label: "Email",
      },
      {
        id: 'role',
        label: "Role",
        flex: 0.5,
        align: "right",
      },
      {
        id: 'bio',
        label: "Bio",
        flex: 1,
      },
      {
        id: 'pic',
        label: "Profile Pic",
        description: "Profile picture of the user",
        flex: 1,
        renderCell: (params) => {
          if (params.value)
            return (
              <img src={`${API_INSTANCE.BASE_URL}/auth/image/${params.value}`} className="rounded-full w-10 aspect-square object-cover" alt="User profile pic" />
            )
        }
      },
      {
        id: 'createdAt',
        label: "Created At",
        flex: 1,
        render: (user) => user.createdAt,
      }
    ]
    content = (
      <section>
        <CustomGrid data={data} config={config} />
      </section>
    )
  } else if (isError) {
    console.error("Error loading data: " + error);
  }

  return content;
}

export default UsersList;