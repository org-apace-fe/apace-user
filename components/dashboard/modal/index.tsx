import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { Grid } from "@material-ui/core";
import { closeModal } from "../../../store/actions/modal/modalActions";
import { RootState } from "../../../store/store";

const styles = {
  main: {
    backgroundColor: "rgba(27, 12, 2, 0.5)",
    zIndex: 1300,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties,
  messageBox: {
    backgroundColor: "#494949",
    width: "auto",
    minWidth: "30vw",
    overflow: "auto",
    textAlign: "center",
    borderRadius: "10px",
    padding: "10px",
    position: "relative",
  } as React.CSSProperties,
};

export default function Modal() {
  const modalProps = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const { modalOpened, modalContent, modalStyles } = modalProps;
  const Close = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(closeModal());
  };
  return (
    <>
      {modalOpened ? (
        <Grid
          container
          style={{ ...styles.main, left: 0 }}
          onClick={(e) => Close(e)}
        >
          <Grid
            item
            xs={10}
            sm={6}
            md={4}
            style={{ ...styles.messageBox, ...modalStyles }}
          >
            <CancelIcon
              width="25px"
              height="25px"
              onClick={(e) => Close(e)}
              style={{
                zIndex: 20,
                cursor: "pointer",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            />
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {modalContent}
            </div>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}
