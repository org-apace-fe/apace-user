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

    case "Initiated":
      return "bg-apace-orange-light border-apace-orange-light text-black";
    case "Pending":
      return "bg-red-400 border-red-400 text-black";
    case "Blacklisted":
      return "bg-black border-black text-white";
    case "Cancelled":
      return "bg-gray-700 border-gray-700 text-black";
    case "Processing":
      return "bg-apace-orange-dark border-apace-orange-dark text-black";
    case "Delivered":
      return "bg-green-700 border-green-700 text-black";
    case "Dispatched":
      return "bg-apace-orange-light border-apace-orange-light text-black";

    case "Created":
      return "bg-apace-orange-light border-apace-orange-light text-black";
    case "Active":
      return "bg-green-700 border-green-700 text-black";
    case "Due":
      return "bg-yellow-700 border-yellow-700 text-black";
    case "Paid":
      return "bg-green-700 border-green-700 text-black";
    case "Inactive":
      return "bg-gray-700 border-gray-700 text-black";
    case "Pending Confirmation":
      return "bg-red-400 border-red-400 text-black";

    case "In-progress":
      return "bg-apace-orange-dark border-apace-orange-dark text-black";
    default:
      return "bg-transparent";
  }
};
