import CustomGrid from "../../components/table/CustomGrid";
import { useGetAllUsersQuery } from "../../store";
import { API_INSTANCE } from "../../store/apis/features/apisConst";
import CustomLink from "../../components/CustomLink";
import { WEBLINKS } from "../../store/constants/WebLinks";
import { CgDetailsMore, CgProfile } from "react-icons/cg";
import { Card, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function UsersList() {
  useEffect(() => {
    document.title = "Users List";
  }, [])

  const { data, isLoading, isSuccess, isError, error } = useGetAllUsersQuery();
  const currentUserId = useSelector((state) => state.user.id);
  let content;
  if (isLoading) {
    content = <LinearProgress color="success" />;
  } else if (isSuccess) {
    const config = [
      {
        id: 'id',
        label: "Id",
      },
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
          currentUserId !== user.id ? (
            <div>
              <CustomLink to={`${WEBLINKS.ADMIN_MANAGE_ACCOUNT}/${user.id}`} className="text-blue-500 border border-blue-500 rounded-full px-2 flex items-center hover:bg-blue-300">
                <CgDetailsMore className="mr-1" />
                Details
              </CustomLink>
            </div>
          ) : (
            <div>
              <CustomLink to={WEBLINKS.ADMIN_PROFILE} className="text-green-500 border border-green-500 rounded-full px-2 flex items-center hover:bg-green-300">
                <CgProfile className="mr-1" />
                Profile
              </CustomLink>
            </div>
          )
        ),
      }
    ]
    content = (
      <Card>
        <CustomGrid data={data} config={config} />
      </Card>
    )
  } else if (isError) {
    console.error("Error loading data: " + error);
  }

  return content;
}

export default UsersList;