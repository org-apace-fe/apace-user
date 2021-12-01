export const background = {
  apacegray2:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.14)), #121212",
  apacegray3:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07)), #121212",
  apacegray4:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #121212",
  apacegray5:
    " linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), #121212",
  apacegray6:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))",
};

export const ColorButton = (status: string) => {
  switch (status) {
    case "Successful":
      return "bg-green-700 border-green-700 text-black";
    case "Completed":
      return "bg-green-700 border-green-700 text-black ";
    case "Pending":
      return "bg-red-600 border-red-600 text-black";
    case "In-progress":
      return "bg-orange-700 border-orange-700 text-black";
    default:
      return "bg-transparent";
  }
};
