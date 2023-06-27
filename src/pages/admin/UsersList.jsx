import CustomGrid from "../../components/table/CustomGrid";
import { useGetUsersQuery } from "../../store";
import { API_INSTANCE } from "../../store/apis/features/apisConst";

function UsersList() {
  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery();

  let content;
  if (isLoading) {
    content = <p>Loading</p>;
  } else if (isSuccess) {
    const config = [
      {
        id: 'id',
        label: "Id",
        render: (user) => user.id,
      },
      {
        id: 'username',
        label: "Username",
        render: (user) => user.username,
      },
      {
        id: 'email',
        label: "Email",
        render: (user) => user.email,
      },
      {
        id: 'role',
        label: "Role",
        flex: 0.5,
        align: "right",
        render: (user) => user.role,
      },
      {
        id: 'bio',
        label: "Bio",
        flex: 1,
        render: (user) => user.bio,
      },
      {
        id: 'pic',
        label: "Profile Pic",
        description: "Profile picture of the user",
        flex: 1,
        render: (user) => user.pic,
        renderCell: (params) => {
          if (params.value)
            return (
              <img src={`${API_INSTANCE.BASE_URL}/auth/image/${params.value}`} className="w-10" alt="User profile pic" />
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