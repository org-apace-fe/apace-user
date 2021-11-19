import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Pills({ children, src, href }: any) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`relative mr-20 pb-3 ${
          router.pathname == href ? "text-white  border-b-4 border-white " : "text-gray-400"
        } `}
       
      >
       <p className="rounded-sm py-1 px-2" > {children}</p>
      </a>
    </Link>
  );
}
