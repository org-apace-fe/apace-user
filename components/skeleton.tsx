import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const Dummy = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export const SkeletonLoader = ({ className }: any) => {
  return (
    <>
      {Dummy.map((e) => (
        <div key={e.id} className={`${className} lg:w-1/5 w-full p-2 `}>
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
      ))}
    </>
  );
};

export const SkeletonLoader2 = ({ className }: any) => {
  return (
    <>
      {Dummy.slice(0, 4).map((e) => (
        <div key={e.id} className={`${className} lg:w-1/2 w-full p-2 `}>
          <div className="w-full text-white"></div>
          <Skeleton
            variant="rectangular"
            width="full"
            height="9.5rem"
            sx={{ bgcolor: "grey.900", borderRadius: "0.5rem" }}
          />
        </div>
      ))}
    </>
  );
};
