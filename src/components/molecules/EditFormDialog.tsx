import React, { FC } from 'react';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

import TodoForm from 'components/molecules/TodoForm';
import SpinnerButton from 'components/molecules/SpinnerButton';
import Snackbars from 'components/molecules/Snackbars';

type Props = {
  isLoading: boolean;
  isOpen: boolean;
  isError: boolean;
  title: string;
  deadline?: string;
  handleOpen: () => void;
  handleClose: () => void;
  handleError: () => void;
  handleTaskUpdated: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleTaskDeleted: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditFormDialog: FC<Props> = ({
  isLoading = false,
  isOpen = false,
  isError = false,
  title = '',
  deadline = '',
  handleOpen = () => undefined,
  handleClose = () => undefined,
  handleError = () => undefined,
  handleTaskUpdated = () => undefined,
  handleTaskDeleted = () => undefined,
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
    {isOpen ? (
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        data-testid="dialog"
      >
        <DialogTitle id="form-dialog-title">編集</DialogTitle>
        <DialogContent>
          <TodoForm {...{ isLoading, title, deadline, handleChange }} />
        </DialogContent>
        <DialogActions>
          <SpinnerButton
            isLoading={isLoading}
            onClick={handleTaskUpdated}
            color="primary"
          >
            更新する
          </SpinnerButton>
          <SpinnerButton
            isLoading={isLoading}
            onClick={handleTaskDeleted}
            color="secondary"
          >
            削除する
          </SpinnerButton>
        </DialogActions>
        {isError && <Snackbars open={isError} handleClose={handleError} />}
      </Dialog>
    ) : null}
  </>
);

export default EditFormDialog;
