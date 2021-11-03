export function TopDeals({ item }: any) {
  return (
    <div className="w-full text-white">
      <div
        key={item.id}
        style={{
          backgroundImage: `url(${item.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
        className="relative w-full h-80 rounded-lg  font-bold "
      >
        <div className="w-full h-full bg-apace-black opacity-40"></div>
        <div className="absolute top-0 right-0 p-2 z-30">
          <p className="uppercase text-sm "> Up to </p>
          <p className="text-4xl">{item.discount}</p>
          <span className="text-sm uppercase "> off </span>
        </div>
        <div className="absolute bottom-3 left-2 w-16 h-14 rounded-md overflow-hidden z-30 ">
          <img src="/icons/swarovski.svg" alt="Picture of the author" />
        </div>
      </div>
      <div className="mt-2">
        <p>{item.name} </p>
        <p className="font-bold"> {item.description} </p>
      </div>
    </div>
  );
}

export function FeaturedStore({ item }: any) {
  return (
    <div className="w-full text-white">
      <div
        key={item.id}
        style={{
          backgroundImage: `url(${item.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
        className="relative w-full h-80 rounded-lg  font-bold "
      >
        <div className="w-full h-full bg-apace-black opacity-40"></div>
        <div className="absolute bottom-3 left-2 w-16 h-14 rounded-md overflow-hidden  z-30 ">
          <img src="/icons/swarovski.svg" alt="Picture of the author" />
        </div>
      </div>
    </div>
  );
}

export function ShopCategory({ item }: any) {
  return (
    <div className="relative w-full text-white">
      <div
        key={item.id}
        style={{
          backgroundImage: `url(${item.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
        className="relative w-full h-80 rounded-lg  font-bold "
      >
        <div className="w-full h-full bg-apace-black opacity-40"></div>
        <div className="absolute bottom-2 left-2   rounded-md overflow-hidden z-30 ">
          <p className="text-2xl"> {item.category} </p>
        </div>
      </div>
    </div>
  );
}
