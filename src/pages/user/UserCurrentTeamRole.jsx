import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { TeamRole } from "../../store/constants/Role";

export default function UserCurrentTeamRole({ currentRole, memberId, teamId }) {
  const [role, setRole] = useState(currentRole);

  if (currentRole === TeamRole.CREATOR) {
    return currentRole;
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`member_${memberId}`}>
          Team Role
        </InputLabel>
        <Select
          labelId={`member_${memberId}`}
          id={`id_${memberId}`}
          value={role}
          label="Team Role"
          onChange={e => setRole(e.target.value)}
        >
          <MenuItem value={TeamRole.ADMINISTRATOR}>{TeamRole.ADMINISTRATOR}</MenuItem>
          <MenuItem value={TeamRole.MEMBER}>{TeamRole.MEMBER}</MenuItem>
          <MenuItem value={TeamRole.GUEST}>{TeamRole.GUEST}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}