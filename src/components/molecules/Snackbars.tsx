import React, { FC } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const Alert = (props: AlertProps) => {
  const { severity, children } = props;

  return (
    <MuiAlert elevation={6} variant="filled" severity={severity}>
      {children}
    </MuiAlert>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',

    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Snackbars: FC<Props> = ({
  open = false,
  handleClose = () => undefined,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        data-testid="error"
      >
        <Alert onClose={handleClose} severity="error">
          エラーが発生しました。時間をおいて再度お試しください。
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Snackbars;
