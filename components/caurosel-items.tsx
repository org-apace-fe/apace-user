import { IItems } from "../interfaces/items.enum";

type ItemsProps = {
  item: IItems;
};

export function Items({ item }: ItemsProps) {
  return (
    <div key={item.id} className=" h-96" style={{ height: "30rem" }}>
      <img className="w-full h-full object-contain" src={item.photo} />
    </div>
  );
}

type Items2Props = {
  item: IItems;
};
export function Items2({ item }: Items2Props) {
  return (
    <div key={item.id} className=" h-96" style={{ height: "30rem" }}>
      <img className="w-full h-full object-contain" src={item.photo} />
    </div>
  );
}
