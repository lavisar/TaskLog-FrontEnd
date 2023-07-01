import { useDispatch, useSelector } from "react-redux"

export default function ImageChange() {
  const dispatch = useDispatch();
  const pic = useSelector((state) => state.user.pic);

  
  return (
    <div>

    </div>
  )
}