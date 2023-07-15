import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";
import { RiTeamFill } from "react-icons/ri";
import { WEBLINKS } from "../store/constants/WebLinks";
import { BiSolidDashboard } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import CustomLink from "./CustomLink";
import { LuMilestone } from "react-icons/lu";

export default function SideBar2({ open }) {
	const currentTeam = createSelector(
		(state) => state.team.id,
		(state) => state.team.teamName,
		(state) => state.currentMember.teamMemberRole,
		(teamId, teamName, teamMemberRole) => ({
			teamId,
			teamName,
			teamMemberRole,
		})
	);
	const { teamId, teamName, teamMemberRole } = useSelector(currentTeam);
	const userId = useSelector((state) => state.user.id);
	const projectId = useSelector((state) => state.project.id);
	const listItems = [
		{
			icon: <RiTeamFill />,
			link: "TEAM",
			path: `${WEBLINKS.TEAMS}/${teamId}`,
		},
		{
			icon: <BiSolidDashboard />,
			link: "TASK BOARD",
			path: `${WEBLINKS.TASK}?projectId=${projectId}`,
		},
		{
			icon: <FaTasks />,
			link: "MY TASK",
			path: `${WEBLINKS.TASK}/${userId}`,
		},
		{
			icon: <HiDocumentDuplicate />,
			link: "DOCUMENTS",
			path: `${WEBLINKS.DOCUMENT}/${projectId}`,
			//http://localhost:8080/document/001
		},
		{
			icon: <LuMilestone />,
			link: "MILESTONE",
			path: null,
		},
	];
	return (
		<Box>
			<Toolbar className="text-white flex-col !text-left">
				{open && (
					<div className="w-full pt-2 select-none">
						<Typography variant="h5">{teamName}</Typography>
						<p className="text-gray-400">Role: {teamMemberRole}</p>
					</div>
				)}
			</Toolbar>
			<List>
				{listItems.map((item, index) => (
					<ListItem
						key={index}
						disablePadding
						sx={{ display: "block" }}
					>
						<CustomLink
							to={item.path}
							className="text-xl text-white rounded-2xl ease-in-out hover:bg-green-400 hover:mx-3 duration-300 select-none my-2"
							activeClassName="mx-2 !font-bold bg-green-400 rounded-2xl !text-black"
							// linkClass="items-center"
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: "auto",
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
										color: "inherit",
									}}
								>
									{item.icon}
								</ListItemIcon>
								<ListItemText
									sx={{
										opacity: open ? 1 : 0,
										fontWeight: 700,
										fontSize: "inherit",
									}}
									disableTypography
								>
									{item.link}
								</ListItemText>
							</ListItemButton>
						</CustomLink>
					</ListItem>
				))}
			</List>
		</Box>
	);
}
