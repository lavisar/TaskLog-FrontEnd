import { useNavigate, useParams } from "react-router-dom";
import { setCurrentMember, setTeam, useGetAllMembersDetailsQuery, useGetCurrentMemberQuery, useGetTeamQuery, useRemoveMemberMutation } from "../../store";
import { WEBLINKS } from "../../store/constants/WebLinks";
import { API_INSTANCE } from "../../store/apis/features/apisConst";
import CustomTableSortable from "../../components/table/CustomTableSortable";
import UserCurrentTeamRole from "./components/team/UserCurrentTeamRole";
import { IoPersonRemove } from 'react-icons/io5';
import { Avatar, Box, Button, Card, Modal, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { TeamRole } from "../../store/constants/Role";
import AddMemberButton from "./components/team/AddMemberButton";
import UserTeamUpdate from "./components/team/UserTeamUpdate";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

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

  useEffect(() => {
    document.title = "Team"
    if (teamIsSuccess) {
      document.title = `Team ${teamData.teamName}`;
    }
  }, [teamIsSuccess, teamData]);
  const {
    data: currentMemberData,
    isSuccess: currentMemberIsSuccess,
    isLoading: currentMemberIsLoading,
  } = useGetCurrentMemberQuery(teamId);

  const {
    data: membersData,
    isLoading: membersIsLoading,
    isSuccess: membersIsSuccess,
    isError: membersIsError,
    error: membersError
  } = useGetAllMembersDetailsQuery(teamId);

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
        <div className="grid justify-items-end">
          {member.pic ? (
            <span>
              <img src={`${API_INSTANCE.BASE_URL}/auth/image/${member.pic}`} className="rounded-full max-h-12 aspect-square object-cover m-0" alt="Profile pic of member" />
            </span>
          ) : (
            <Avatar className="rounded-full max-h-12 aspect-square object-cover !m-0">
              {member.username.charAt(0)}
            </Avatar>
          )}
        </div>

      ),
      align: 'right',
    },
    {
      id: 'username',
      label: 'Name',
      renderCell: (member) => (
        <div className={member.teamMemberId === currentMemberData?.teamMemberId ? "bg-green-200 rounded-xl px-2 py-1" : ''}>{member.username}
        </div>
      ),
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
      renderCell: (member) => dayjs(member.addedAt).format('MMM. DD, YYYY'),
      sortValue: (member) => member.addedAt,
    },
    {
      id: 'remove',
      label: 'Remove',
      renderCell: (member) => {
        if (member.teamMemberRole === TeamRole.CREATOR) {
          return '';
        }
        if (![TeamRole.CREATOR, TeamRole.ADMINISTRATOR].includes(currentMemberData?.teamMemberRole) && member.teamMemberId !== currentMemberData?.teamMemberId) {
          return '';
        }
        return <div>
          <Button
            onClick={() => handleOpen(member.teamMemberId, member.username, member.email)}
            className="!rounded-full aspect-square !min-w-min hover:!bg-red-300"
          >
            <IoPersonRemove className="text-lg text-red-400" />
          </Button>
        </div>
      },
    },
  ]

  let content
  if (membersIsLoading) {
    content = <h1>Loading...</h1>;
  } else if (membersIsError) {
    console.log(membersError)
  } else if (membersIsSuccess) {
    content = (
      <Card>
        {[TeamRole.CREATOR, TeamRole.ADMINISTRATOR].includes(currentMemberData?.teamMemberRole) && <AddMemberButton />}
        <CustomTableSortable data={membersData} config={config} />
      </Card>
    )
  }

  return (
    <div>
      <Card className="mb-10 px-3 py-10 !rounded-lg">
        <UserTeamUpdate currentMemberIsLoading={currentMemberIsLoading} />

      </Card>

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
          {memberId === currentMemberData?.teamMemberId ? (
            <Typography id="remove-member-modal" variant="h6" className="text-center">
              Do you want to leave this team?
            </Typography>
          ) : (
            <div>
              <Typography id="remove-member-modal" variant="h6" className="text-center">
                Do you want to remove this member?
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }} className="text-center !flex-column">
                <span>Username: {name}</span>
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }} className="text-center flex-column">
                <span>Email: {email}</span>
              </Typography>
            </div>
          )}
          <Box className="flex mt-5 items-center justify-between">
            <LoadingButton
              loading={isLoading}
              onClick={() => handleRemove(memberId)}
              variant="contained"
              color="error"
              className=""
            >
              {memberId === currentMemberData?.teamMemberId ? 'Yes' : 'Remove'}
            </LoadingButton>
            <Button onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div >
  );
}