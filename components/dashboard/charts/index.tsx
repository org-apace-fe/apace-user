import moment from "moment";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ purchaseChart }: any) => {
  const data = purchaseChart?.map((pc: any) => {
    return {
      date: moment(pc.date).format("MMM"),
      amount: 70000,
      // total_amount: pc.total_amount
    };
  });

  return (
    <>
      <ResponsiveContainer width={"99%"} height={300}>
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorName" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E674F0" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#E674F0" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E674F0" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#E674F0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            horizontal={true}
            vertical={false}
          />
          <XAxis dataKey="date" />
          <YAxis dataKey="amount" domain={[0, 200000]} axisLine={false} />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#E674F0"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorName)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default Charts;
