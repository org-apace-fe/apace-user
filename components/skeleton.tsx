import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const SkeletonLoader = () => {
  return (
    <div className="lg:w-1/5 w-full p-2">
      <div className="w-full text-white"></div>
      <Skeleton
        variant="rectangular"
        width="full"
        height="15rem"
        sx={{ bgcolor: "grey.900", borderRadius: "0.5rem" }}
      />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton width="full" sx={{ bgcolor: "grey.900" }} />
        <Skeleton width="60%" sx={{ bgcolor: "grey.900" }} />
      </Box>
    </div>
  );
};

export default SkeletonLoader;
