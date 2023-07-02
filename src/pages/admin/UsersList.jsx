import CustomGrid from "../../components/table/CustomGrid";
import { useGetAllUsersQuery } from "../../store";
import { API_INSTANCE } from "../../store/apis/features/apisConst";
import CustomLink from "../../components/CustomLink";
import { WEBLINKS } from "../../store/constants/WebLinks";
import { CgDetailsMore } from "react-icons/cg";

function UsersList() {
  const { data, isLoading, isSuccess, isError, error } = useGetAllUsersQuery();
  let content;
  if (isLoading) {
    content = <p>Loading</p>;
  } else if (isSuccess) {
    const config = [
      // {
      //   id: 'id',
      //   label: "Id",
      // },
      {
        id: 'pic',
        label: "Profile Pic",
        description: "Profile picture of the user",
        flex: 1,
        renderCell: (params) => {
          if (params.value) {
            return (
              <img src={`${API_INSTANCE.BASE_URL}/auth/image/${params.value}`} className="rounded-full w-10 aspect-square object-cover" alt="User profile pic" />
            )
          }
        }
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
      // {
      //   id: 'bio',
      //   label: "Bio",
      //   flex: 1,
      // },
      {
        id: 'createdAt',
        label: "Created At",
        flex: 1,
      },
      {
        id: 'details',
        label: "Details",
        flex: 1,
        renderCell: (user) => (
          <div>
            <CustomLink to={`${WEBLINKS.ADMIN_MANAGE_ACCOUNT}/${user.id}`} className="text-blue-500 border border-blue-500 rounded-full px-2 flex items-center hover:bg-blue-300">
              <CgDetailsMore className="mr-1" />
              Details
            </CustomLink>
          </div>
        ),
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