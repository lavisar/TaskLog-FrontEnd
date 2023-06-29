import { useNavigate, useParams } from "react-router-dom";
import { setCurrentMember, setTeam, useGetAllMembersDetailsQuery, useGetCurrentMemberQuery, useGetTeamQuery, useRemoveMemberMutation } from "../../store";
import { WEBLINKS } from "../../store/constants/WebLinks";
import { API_INSTANCE } from "../../store/apis/features/apisConst";
import CustomTableSortable from "../../components/table/CustomTableSortable";
import UserCurrentTeamRole from "./UserCurrentTeamRole";
import { IoPersonRemove } from 'react-icons/io5';
import { Box, Button, Modal, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { TeamRole } from "../../store/constants/Role";
import AddMemberButton from "./components/AddMemberButton";
import UserTeamUpdate from "./components/UserTeamUpdate";
import { useDispatch } from "react-redux";

export default function UserCurrentTeam() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // for remove modal
  const [open, setOpen] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // get data ---------------------------------------
  const {
    data: teamData,
    // isLoading: teamIsLoading,
    isSuccess: teamIsSuccess,
    isError: teamIsError,
    // error: teamError
  } = useGetTeamQuery(teamId);

  const {
    data: currentMemberData,
    isSuccess: currentMemberIsSuccess,
  } = useGetCurrentMemberQuery(teamId);

  const {
    data: membersData,
    isLoading: membersIsLoading,
    isSuccess: membersIsSuccess,
    isError: membersIsError,
    error: membersError
  } = useGetAllMembersDetailsQuery(teamId);
  // console.log(membersData);

  const [remove, { isLoading }] = useRemoveMemberMutation();


  useEffect(() => {
    if (teamIsError) {
      navigate(WEBLINKS.MAIN);
    } else if (teamIsSuccess) {
      dispatch(setTeam(teamData));
    }

    if (currentMemberIsSuccess) {
      dispatch(setCurrentMember(currentMemberData));
    }
  }, [dispatch, navigate, teamData, teamIsError, teamIsSuccess, currentMemberData, currentMemberIsSuccess]);

  const handleOpen = (id, username, email) => {
    setOpen(true);
    setMemberId(id);
    setName(username);
    setEmail(email);
  }
  const handleRemove = async (memberId) => {
    try {
      const result = await remove(memberId);
      console.log(result);
      if (result?.error?.data) {
        console.log("Member cannot be removed");
        return;
      }
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const config = [
    {
      id: 'pic',
      label: '',
      renderCell: (member) => (
        <span>
          <img src={`${API_INSTANCE.BASE_URL}/auth/image/${member.pic}`} className="rounded-full max-h-12 aspect-square object-cover m-0" alt="Profile pic of member" />
        </span>
      ),
      align: 'right',
    },
    {
      id: 'username',
      label: 'Name',
      renderCell: (member) => member.username,
      sortValue: (member) => member.username,
    },
    {
      id: 'email',
      label: 'Email',
      renderCell: (member) => member.email,
      sortValue: (member) => member.email,
    },
    {
      id: 'teamMemberRole',
      label: 'Role',
      renderCell: (member) => (
        <UserCurrentTeamRole
          currentRole={member.teamMemberRole}
          memberId={member.teamMemberId}
          teamId={member.teamId}
        />
      ),
      sortValue: (member) => member.teamMemberRole,
    },
    {
      id: 'addedAt',
      label: 'Joined Date',
      renderCell: (member) => member.addedAt,
      sortValue: (member) => member.addedAt,
    },
    {
      id: 'remove',
      label: 'Remove',
      renderCell: (member) =>
        member.teamMemberRole === TeamRole.CREATOR ? '' : (
          <div>
            <LoadingButton
              loading={isLoading}
              onClick={() => handleOpen(member.teamMemberId, member.username, member.email)}
              className="!rounded-full aspect-square !min-w-min !hover:bg-red-300"
            >
              <IoPersonRemove className="text-lg text-red-400" />
            </LoadingButton>
          </div>
        )
      ,
    },
  ]

  let content
  if (membersIsLoading) {
    content = <h1>Loading...</h1>;
  } else if (membersIsError) {
    console.log(membersError)
  } else if (membersIsSuccess) {
    content = <CustomTableSortable data={membersData} config={config} />
  }

  return (
    <div>
      <UserTeamUpdate />

      <AddMemberButton />

      {/* TABLE ------------------------------------------- */}
      {content}


      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="remove-member-modal"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: '20px',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="remove-member-modal" variant="h6" className="text-center">
            Do you want to remove this member?
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }} className="text-center">
            <p>Username: {name}</p>
            <p>Email: {email}</p>
          </Typography>
          <Box className="flex mt-5 items-center justify-between">
            <LoadingButton
              loading={isLoading}
              onClick={() => handleRemove(memberId)}
              variant="contained"
              color="error"
              className=""
            >
              Remove
            </LoadingButton>
            <Button onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}