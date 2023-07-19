import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { logOut, useDeleteAllRefreshTokensMutation } from "../../../../store";
import { useDispatch } from "react-redux";

export default function DeleteRefreshToken() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deleteAll, { isLoading }] = useDeleteAllRefreshTokensMutation();

  const handleDelete = async () => {
    try {
      const result = await deleteAll().unwrap();
      if (result?.data?.error) {
        console.log(result.data.error);
      }
      console.log(result);
      setOpen(false);
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  }
  return <>
    <Button onClick={() => setOpen(true)} className="!rounded-full">
      <div className="flex items-center p-3 bg-red-500 rounded-full text-white hover:bg-red-600">
        <span className="pr-2"><MdDelete /></span>
        Delete All Refresh Token
      </div>
    </Button>
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="delete-user-modal"
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
        <div>
          <Typography id="remove-member-modal" variant="h6" className="text-center">
            Do you want to delete this user?
          </Typography>
        </div>
        <Box className="flex mt-5 items-center justify-between">
          <LoadingButton
            loading={isLoading}
            onClick={handleDelete}
            loadingIndicator="Deleting..."
            variant="contained"
            color="error"
            className=""
          >
            Delete
          </LoadingButton>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  </>
}