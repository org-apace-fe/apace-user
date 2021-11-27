import React from "react";
import { Snackbar } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeToast } from "../store/actions/toast/toastActions";
import Slide from "@material-ui/core/Slide";
import { RootState } from "../store/store";
export default function Toast() {
  const Toast = useSelector((state: RootState) => state.toast);
  const { toastOpened, toastContent, toastStyles } = Toast;
  const dispatch = useDispatch();
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        zIndex: 1400,
        "& div": toastStyles,
      },
    })
  );
  const classes = useStyles();
  return (
    <>
      {toastOpened ? (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            classes={{ root: classes.root }}
            transitionDuration={100}
            open={toastOpened}
            onClose={() => dispatch(closeToast())}
            message={toastContent}
            autoHideDuration={10000}
          />
        </Slide>
      ) : null}
    </>
  );
}
