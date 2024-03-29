import { useRouter } from "next/router";
import { useEffect } from "react";

const withoutAuth = (WrappedComponent) => {
  const Comp = (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const token = localStorage.getItem("token");
      if (!token) {
        return <WrappedComponent {...props} />;
      }

      Router.replace("/dashboard");
      return null;
    }

    // If we are on server, return null
    return null;
  };
  Comp.displayName = "Comp";

  return Comp;
};

export default withoutAuth;
