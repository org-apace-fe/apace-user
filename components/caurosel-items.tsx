export function Items({ item }: any) {
  return (
    <div className="w-full h-full">
      <div
        key={item.id}
        style={{
          backgroundImage: `url(${item.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
        className="w-full h-full"
      ></div>
    </div>
  );
}
