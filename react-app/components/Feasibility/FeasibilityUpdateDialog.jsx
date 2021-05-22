import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";

import UpdateDialogTable from "components/Table/TableFeasibilityDialogUpdate.jsx";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
    },
    buttonRight: {
      float : 'right',
  }
}));

export default function MaxWidthDialog(props) {
  const classes = useStyles();

  const { FeasibilityId, dialogClose, open } = props;

    
  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={dialogClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">
        Update {FeasibilityId}
              <Button onClick={dialogClose} color="danger" className={ classes.buttonRight}>
          Close
        </Button>
      </DialogTitle>
      <DialogContent dividers>
        <UpdateDialogTable />
      </DialogContent>
    </Dialog>
  );
}
