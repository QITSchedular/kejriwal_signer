import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';


export default function ModalBox({urlBlob}) {
    console.log(urlBlob);
  const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
const handleConfirm = async() => {
  setOpen(false);   
  window.open(urlBlob, '_blank');
    
}
const handleClose = () => {
    console.log("close");
    setOpen(false);
};
React.useEffect(() => {
    setOpen(true);
},[urlBlob])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
         aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Download Pdf ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To view or download the pdf on another tab press confirm.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}