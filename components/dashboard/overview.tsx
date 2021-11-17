import OverviewPayment from "./overview/payment";
import OverviewPurchase from "./overview/purchase";
import OverviewReferrals from "./overview/referrals";

const Overview = () => {
  return (
    <div className="font-body">
      <OverviewPayment />
      <OverviewPurchase />
      <OverviewReferrals />
    </div>
  );
};

export default Overview;
