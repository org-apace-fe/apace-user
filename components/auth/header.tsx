import { ApaceLogoIcon } from "../icons/logo";
import { useRouter } from "next/router";
import Link from "next/link"

const AuthHeader = () => {
  const router = useRouter();

  return (
    <>
      <div className="bg-apace-black border-gray-800  w-full py-5  border-b px-8 sm:px-6 lg:px-24 ">
        <Link href="/" >
          <a>
        <ApaceLogoIcon />
        </a>
        </Link>
      </div>
    </>
  );
};

export default AuthHeader;
