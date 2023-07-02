import { useDispatch } from "react-redux"
import { setUser, useDeleteImageMutation, useUpdateUserMutation } from "../../../../store";
import { useState } from "react";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { API_INSTANCE } from "../../../../store/apis/features/apisConst";

export default function ImageChange({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [updateUser, { isLoading: Updating }] = useUpdateUserMutation();
  const [remove, { isLoading: Removing }] = useDeleteImageMutation();

  const [image, setImage] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (image === null) {
      return;
    }
    const updateDetails = new FormData();
    updateDetails.append("image", image);
    try {
      const result = await updateUser(updateDetails).unwrap();
      if (result?.error?.data) {
        setRequestError(result.error.data);
        return;
      }
      dispatch(setUser(result));
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemove = async (e) => {
    try {
      const result = await remove(data.id);
      if (result?.error?.data) {
        return;
      }
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="px-4 items-center">
      <div className="pb-3">
        {data.pic ? (
          <img
            src={`${API_INSTANCE.BASE_URL}/auth/image/${data.pic}`}
            className="w-20 h-20 aspect-square object-cover rounded-full"
            alt="Profile pic of user"
          />
        ) : (
          <Avatar className="!w-20 !h-20">
            {data?.username?.charAt(0)}
          </Avatar>
        )}
      </div>
      <form onSubmit={handleUpdate}>
        <label className="block">
          <span className="sr-only">Choose profile</span>
          <input type="file"
            className="block w-full text-sm text-slate-500 
          file:mr-4 file:py-2 file:px-4 
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-green-50 file:text-green-500
          hover:file:bg-green-100 cursor-pointer"
            id="pic"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {image && (
          <div>
            {requestError ? (
              <p className="text-red-300 text-sm">{requestError}</p>
            ) : ''}

            <div className="flex m-2">
              <LoadingButton
                type='submit'
                size='small'
                loading={Updating}
                loadingIndicator="Updating..."
                // loadingPosition='end'
                variant='contained'
                className="!bg-green-400 !hover:bg-green-600 !rounded-full"
              >
                <span className='px-5'>Update profile picture</span>
              </LoadingButton>
              <Button onClick={() => setImage(null)}>Cancel</Button>
            </div>
          </div>
        )}
      </form>

      <Button
        size='small'
        onClick={() => setOpen(true)}
        variant='contained'
        className="!bg-red-500 !hover:bg-red-600 !rounded-full !mt-10"
      >
        <span className='px-5'>Remove Profile Pic</span>
      </Button>
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
            Do you want remove your profile picture?
          </Typography>
          <Box className="flex mt-5 items-center justify-between">
            <LoadingButton
              loading={Removing}
              onClick={handleRemove}
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
    </div >
  )
}