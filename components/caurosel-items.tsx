import { IItems } from "../interfaces/items.enum";
import Image from "next/image";

type ItemsProps = {
  item: IItems;
};

export function Items({ item }: ItemsProps) {
  return (
    <div key={item.id} className=" h-96" style={{ height: "30rem" }}>
      <Image
        className="w-full h-full object-contain"
        src={item.photo}
        layout="fill"
        placeholder="blur"
        alt="apace"
        blurDataURL="#BD632F"
      />
    </div>
  );
}

type Items2Props = {
  item: IItems;
};
export function Items2({ item }: Items2Props) {
  return (
    <div key={item.id} className=" h-96" style={{ height: "30rem" }}>
      <Image
        className="w-full h-full object-contain"
        src={item.photo}
        layout="fill"
      />
    </div>
  );
}
