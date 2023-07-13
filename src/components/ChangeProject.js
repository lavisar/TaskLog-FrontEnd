import {
  Button,
  ClickAwayListener,
  Grow,
  LinearProgress,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useGetAllProjectsQuery } from "../store/apis/projectApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setProject } from "../store";

export default function ChangeProject() {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetAllProjectsQuery();
  const teamId = useSelector((state) => state.team.id);

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
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const chooseProject = (project, e) => {
    dispatch(setProject(project));
    handleClose(e);
  };
  let content;
  if (isLoading) {
    content = (
      <MenuItem className="flex-col !items-start !select-text">
        <div className="h-3 w-40">
          <LinearProgress color="success" />
        </div>
      </MenuItem>
    );
  } else if (isSuccess) {
    let projectData = [];
    projectData = data.filter((project) => project.team_id === teamId);
    content = projectData.map((p, index) => {
      return (
        <MenuItem
          className="flex-col !items-start !select-text"
          key={index}
          onClick={(e) => chooseProject(p, e)}
        >
          <p>{p.name}</p>
        </MenuItem>
      );
    });
  }
  return (
    <div>
      <Button
        ref={anchorRef}
        onClick={() => setOpen((prevOpen) => !prevOpen)}
        id="project-btn"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        Projects
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
            className="!shadow-none !shadow-lg border"
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="account-menu"
                  aria-labelledby="account-button"
                  onKeyDown={handleListKeyDown}
                  className="p-3"
                >
                  {content}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
