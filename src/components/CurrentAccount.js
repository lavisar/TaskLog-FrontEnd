import {
  Avatar,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logOut, setUser, useGetPersonalAccountQuery } from "../store";
import { useNavigate } from "react-router-dom";
import { API_INSTANCE } from "../store/apis/features/apisConst";
import { FaUser } from "react-icons/fa6";
import { PiSignOutBold } from "react-icons/pi";

export default function CurrentAccount({ profileLink }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isSuccess } = useGetPersonalAccountQuery();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    }
  }, [dispatch, isSuccess, data]);

  // Account Settings menu
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleProfile = (e) => {
    handleClose(e);
    navigate(profileLink);
  };
  const handleLogout = (e) => {
    handleClose(e);
    dispatch(logOut());
  };

  let content;
  if (isSuccess) {
    content = (
      <div>
        <IconButton
          ref={anchorRef}
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          id="account-button"
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {data?.pic ? (
            <img
              src={`${API_INSTANCE.BASE_URL}/auth/image/${data.pic}`}
              className="w-10 h-10 aspect-square rounded-full"
              alt="Profile pic of user"
            />
          ) : (
            <Avatar sx={{ width: 32, height: 32 }}>
              {data?.username?.charAt(0)}
            </Avatar>
          )}
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-end" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="account-menu"
                    aria-labelledby="account-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem className="flex-col !items-start !select-text">
                      <p>{data.username}</p>
                      <p className="text-sm text-gray-400">{data.email}</p>
                      <Divider className="!border-gray-300 !my-1 w-full" />
                    </MenuItem>
                    <MenuItem onClick={handleProfile}>
                      <FaUser className="mr-2" />
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <PiSignOutBold className="mr-2" />
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
  return <div>{content}</div>;
}
