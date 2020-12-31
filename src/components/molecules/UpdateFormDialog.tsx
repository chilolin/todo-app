import React, { FC } from 'react';

import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

import SpinnerButton from './SpinnerButton';

type Props = {
  open: boolean;
  isLoading: boolean;
  title: string;
  deadline?: string;
  handleOpen: () => void;
  handleClose: () => void;
  handleTaskUpdatedClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleTaskDeletedClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const UpdateFormDialog: FC<Props> = ({
  open = false,
  isLoading = false,
  title = '',
  deadline = undefined,
  handleOpen = () => undefined,
  handleClose = () => undefined,
  handleTaskUpdatedClick = () => undefined,
  handleTaskDeletedClick = () => undefined,
  handleChange = () => undefined,
}) => (
  <>
    <Fab size="medium" color="secondary" aria-label="edit" onClick={handleOpen}>
      <EditIcon />
    </Fab>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">編集</DialogTitle>
      <DialogContent>
        <TextField
          id="standard-basic-update"
          label="やる事"
          value={title}
          onChange={handleChange}
          name="title"
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          id="date"
          label="期日"
          type="date"
          value={deadline}
          onChange={handleChange}
          name="deadline"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <SpinnerButton
          isLoading={isLoading}
          onClick={handleTaskUpdatedClick}
          color="primary"
        >
          更新する
        </SpinnerButton>
        <SpinnerButton
          isLoading={isLoading}
          onClick={handleTaskDeletedClick}
          color="secondary"
        >
          削除する
        </SpinnerButton>
      </DialogActions>
    </Dialog>
  </>
);

export default UpdateFormDialog;
