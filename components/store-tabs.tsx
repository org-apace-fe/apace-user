import { useState, useEffect, CSSProperties } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AllStore, FeaturedStore, TopDealstore } from "./strore/all-store";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFeaturedStores,
  getAllInStoreStores,
  getAllOnlineStores,
  getAllStores,
  getAllTopDealsStores,
} from "../store/actions/apaceStore.action";
import PaginationComponent from "./pagination";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabsType {
  indicatorColor?: CSSProperties["color"];
  // tabsArr: TabType[];
  rootStyle: CSSProperties;
  tabStyle?: CSSProperties;
  tabStyleSelected?: CSSProperties;
  tabStyleNotSelected?: CSSProperties;
  tabParentStyle?: CSSProperties;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ATabs({ personalInfo }: any) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const stores = useSelector((state: any) => state.stores);
  const loader = useSelector((state: any) => state.loader);
  const loading = loader?.LoaderOpened;

  const allStores = stores.allStores?.items;
  const allOnlineStores = stores.onlineStores?.items;
  const allInstoreStores = stores.inStoreStores?.items;
  const allFeaturedStores = stores.featuredStores?.items;
  const allTopDealsStores = stores.topDealsStores?.items;

  useEffect(() => {
    dispatch(getAllStores());
    dispatch(getAllOnlineStores());
    dispatch(getAllInStoreStores());
    dispatch(getAllFeaturedStores());
    dispatch(getAllTopDealsStores());
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const useStyles = makeStyles({
    indicator: {
      width: "62px",
      height: "4px",
      borderRadius: "80px",
    },
    flexContainer: {
      justifyContent: "space-between",
    },
    scrollButtons: {
      marginBottom: "13px",
    },
  });
  const classes = useStyles();

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
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
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="inherit"
            aria-label="basic tabs example"
            classes={{
              indicator: classes.indicator,
              flexContainer: classes.flexContainer,
              scrollButtons: classes.scrollButtons,
            }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              minHeight: "auto",
              // ...tabParentStyle,
            }}
          >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Online" {...a11yProps(1)} />
            <Tab label="In-store" {...a11yProps(2)} />
            <Tab label="Top deals" {...a11yProps(3)} />
            <Tab label="Featured" {...a11yProps(4)} />
          </Tabs>
        </div>
      </Box>
      <TabPanel value={value} index={0}>
        <p className="text-xl font-black font-body">All </p>
        <AllStore
          items={allStores}
          loading={loading}
          personalInfo={personalInfo}
        />
        <PaginationComponent
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <p className="text-xl font-black font-body">Online </p>
        <AllStore
          items={allOnlineStores}
          loading={loading}
          personalInfo={personalInfo}
        />
        <PaginationComponent
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <p className="text-xl font-black font-body">In-store </p>
        <AllStore
          items={allInstoreStores}
          loading={loading}
          personalInfo={personalInfo}
        />
        <PaginationComponent
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <p className="text-xl font-black font-body">Top deals </p>
        <TopDealstore
          items={allTopDealsStores}
          loading={loading}
          personalInfo={personalInfo}
        />
        <PaginationComponent
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <p className="text-xl font-black font-body">Featured </p>
        <FeaturedStore
          items={allFeaturedStores}
          loading={loading}
          personalInfo={personalInfo}
        />
        <PaginationComponent
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TabPanel>
    </Box>
  );
}
