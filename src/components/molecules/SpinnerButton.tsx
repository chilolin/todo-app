import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

const SpinnerButton: FC<{
  children: string;
  isLoading: boolean;
  [other: string]: unknown;
}> = ({ children = '', isLoading = false, ...otherProps }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button disabled={isLoading} {...otherProps}>
        {children}
      </Button>
      {isLoading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

export default SpinnerButton;
