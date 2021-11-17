import { useState, useEffect, CSSProperties } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import ApaceStoreTabs from "../../components/store-tabs";
import Overview from "./overview";

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

export default function DashboardTabs() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const stores = useSelector((state: any) => state.stores);

  useEffect(() => {}, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const useStyles = makeStyles({
    root: {
      textTransform: "lowercase",
    },
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
            color: "#BDBDBD",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="inherit"
            aria-label="Dashbiard tab"
          >
            <Tab label="Stores" {...a11yProps(0)} />
            <Tab label="Overview" {...a11yProps(1)} />
            <Tab label="Payments" {...a11yProps(2)} />
            <Tab label="Purchases" {...a11yProps(3)} />
            <Tab label="Referrals" {...a11yProps(4)} />
            <Tab label="Settings" {...a11yProps(5)} />
          </Tabs>
        </div>
      </Box>
      <TabPanel value={value} index={0}>
        <ApaceStoreTabs />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Overview/>
      </TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
      <TabPanel value={value} index={3}></TabPanel>
      <TabPanel value={value} index={4}></TabPanel>
      <TabPanel value={value} index={5}></TabPanel>
    </Box>
  );
}
