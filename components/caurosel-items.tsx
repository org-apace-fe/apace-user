export function Items({ item }: any) {
  return (
    <div key={item.id} className=" h-96" style={{ height: "30rem" }}>
      <img className="w-full h-full object-contain" src={item.photo} />
    </div>
  );
}

export function Items2({ item }: any) {
  return (
    <div key={item.id} className=" h-96" style={{ height: "30rem" }}>
      <img className="w-full h-full object-contain" src={item.photo} />
    </div>
  );
}
