import { TablePagination, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "transparent",
    marginTop: "1rem",
    borderRadius: "10px",
    overflow: "hidden",
  },
  container: {
    color: "white",
    minHeight: "20rem",
    maxHeight: "70vh",
  },
});

type PaginationProps = {
  page: number;
  onPageChange: any;
  rowsPerPage: any;
  onRowsPerPageChange: any;
};

const PaginationComponent = ({
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}: PaginationProps) => {
  const classes = useStyles();

  return (
    <>
      <Box>
        <div
          style={{
            width: "100%",
            backgroundColor: "#121212",
            borderTop: "0.1rem solid gray ",
            borderBottom: "0.1rem solid gray",
            color: "#BDBDBD",
            paddingTop: "8px",
            // ...rootStyle,
          }}
        >
          <TablePagination
            style={{ color: "#fff" }}
            component="div"
            count={100}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        </div>
      </Box>
    </>
  );
};

export default PaginationComponent;
