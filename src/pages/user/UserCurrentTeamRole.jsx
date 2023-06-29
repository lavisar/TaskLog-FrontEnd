import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { TeamRole } from "../../store/constants/Role";
import { useChangeMemberRoleMutation } from "../../store";

export default function UserCurrentTeamRole({ currentRole, memberId, teamId }) {
  const [role, setRole] = useState(currentRole);
  const [changeRole, { isLoading }] = useChangeMemberRoleMutation();

  useEffect(() => {
    setRole(currentRole);
  }, [currentRole]);

  if (currentRole === TeamRole.CREATOR) {
    return currentRole;
  }

  const handleChange = async (e) => {
    try {
      await changeRole({ id: memberId, role: e.target.value, teamId }).unwrap();
      setRole(e.target.value);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth disabled={isLoading || currentRole === TeamRole.CREATOR}>
        <InputLabel id={`member_${memberId}`}>
          Team Role
        </InputLabel>
        <Select
          labelId={`member_${memberId}`}
          id={`id_${memberId}`}
          value={role}
          label="Team Role"
          onChange={handleChange}
        >
          <MenuItem value={TeamRole.CREATOR} className="!hidden">{TeamRole.CREATOR}</MenuItem>
          <MenuItem value={TeamRole.ADMINISTRATOR}>Administrator</MenuItem>
          <MenuItem value={TeamRole.MEMBER}>Member</MenuItem>
          <MenuItem value={TeamRole.GUEST}>Guest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}