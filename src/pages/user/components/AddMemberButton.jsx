import { Box, Button, ClickAwayListener, FormControl, Grow, InputLabel, NativeSelect, Paper, Popper, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TeamRole } from "../../../store/constants/Role";
import { LoadingButton } from "@mui/lab";
import { useAddMemberMutation } from "../../../store";
import { useSelector } from "react-redux";

export default function AddMemberButton() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const { id } = useSelector(state => state.team);
  const [addMember, { isLoading }] = useAddMemberMutation();

  const handlePopperClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setRole('');
    setEmail('');
  };
  function handleListKeyDown(event) {
    if (event.key === "Escape") {
      setOpen(false);
    }
  }


  // form
  const handleSumit = async e => {
    e.preventDefault();
    if (email.trim() === '' || role.trim() === '') {
      return;
    }
    try {
      await addMember({ email, teamId: id, role });
      setOpen(false);
      setEmail("");
      setRole("");
    } catch (error) {
      console.log(error);
    }
  }
  const addMemberForm = (
    <form onSubmit={handleSumit}>
      <div className="p-1">
        <TextField
          id="email"
          label="Email address"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="off"
          className="w-full"
          variant="standard"
        />
      </div>
      <div className="p-1">
        <FormControl fullWidth>
          <InputLabel htmlFor="select-role" variant="standard">
            Select role
          </InputLabel>
          <NativeSelect
            defaultValue=""
            inputProps={{
              name: "role",
              id: "select-role",
            }}
            onChange={e => setRole(e.target.value)}
          >
            <option value="" aria-label="None"></option>
            <option value={TeamRole.ADMINISTRATOR} className="text-center" title="Member with this role has most authorities besides editing the team">Administrator</option>
            <option value={TeamRole.MEMBER} className="text-center" title="Member with this role can submit to task and edit their own comments">Member</option>
            <option value={TeamRole.GUEST} className="text-center" title="Member with this role can only view informations">Guest</option>
          </NativeSelect>

          <div className="p-2">
            <LoadingButton
              loading={isLoading}
              // loadingIndicator="Adding..."
              variant="contained"
              onClick={handleSumit}
              sx={{
                backgroundColor: "rgb(34 197 94)",
                borderRadius: "9999px",
                "&:hover": {
                  backgroundColor: "rgb(134 239 172)",
                }
              }}
            >
              <span className="text-white">Add member</span>
            </LoadingButton>
          </div>
        </FormControl>
      </div >
    </form >
  )

  return (
    <Box className="text-right mb-4">
      <Button
        ref={anchorRef}
        aria-describedby="add"
        onClick={() => setOpen(prev => !prev)}
        variant="contained"
        className="!bg-green-500 !rounded-full flex items-center justify-between"
        aria-controls={open ? "add-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <FaPlus />
        <span className="pl-2">Add Member</span>
      </Button>
      <Popper id="add"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        sx={{ minWidth: 300 }}
        className="border shadow-black/40 shadow-lg !rounded-2xl !p-3 !bg-white z-10"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-end" ? "left top" : "left bottom",
            }}
          >
            <Paper className="!shadow-none">
              <ClickAwayListener onClickAway={handlePopperClose}>
                <Box
                  id="add-menu"
                  aria-labelledby="add-btn"
                  onKeyDown={handleListKeyDown}
                >
                  {addMemberForm}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}