import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect";

export default function UserProfile() {
  const dispatch = useDispatch();
  const selectDetails = createSelector(
    (state) => state.user.id,
    (state) => state.user.email,
    (state) => state.user.username,
    (state) => state.user.role,
    (state) => state.user.bio,
    (state) => state.user.pic,
    (state) => state.user.createdAt,
    (id, email, username, role, bio, pic, createdAt) => ({ id, email, username, role, bio, pic, createdAt })
  )
  const { id, email, username, role, bio, pic, createdAt } = useSelector(selectDetails);



  return <div>
    User Account
  </div>
}