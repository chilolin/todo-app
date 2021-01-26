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
  isLoading: boolean;
  isOpen: boolean;
  title: string;
  deadline?: string;
  handleOpen: () => void;
  handleClose: () => void;
  handleTaskUpdatedClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleTaskDeletedClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditFormDialog: FC<Props> = ({
  isLoading = false,
  isOpen = false,
  title = '',
  deadline = '',
  handleOpen = () => undefined,
  handleClose = () => undefined,
  handleTaskUpdatedClick = () => undefined,
  handleTaskDeletedClick = () => undefined,
  handleChange = () => undefined,
}) => (
  <>
    <Fab
      size="medium"
      color="secondary"
      aria-label="edit"
      onClick={handleOpen}
      data-testid="edit-button"
    >
      <EditIcon />
    </Fab>
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      data-testid="dialog"
    >
      <DialogTitle id="form-dialog-title">編集</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="edit-title"
          label="やる事"
          value={title}
          onChange={handleChange}
          name="title"
          InputLabelProps={{
            shrink: true,
          }}
          disabled={isLoading}
          required
        />
        <TextField
          id="edit-date"
          label="期日"
          type="date"
          value={deadline}
          onChange={handleChange}
          name="deadline"
          InputLabelProps={{
            shrink: true,
          }}
          disabled={isLoading}
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

export default EditFormDialog;
