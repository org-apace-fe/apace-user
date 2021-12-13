import moment from "moment";
import React from "react";
import millify from "millify";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type purchaseChart = {
  date: string;
  amount: number;
};

type PurchaseChartProps = {
  purchaseChart: purchaseChart[];
};

const Charts = ({ purchaseChart }: PurchaseChartProps) => {
  const data = purchaseChart?.map((pc: any) => {
    return {
      date: pc?.date,
      amount: pc?.total_amount,
    };
  });

  return (
    <>
      <ResponsiveContainer width={"99%"} height={340}>
        <AreaChart
          width={500}
          height={340}
          data={data}
          margin={{
            top: 40,
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
          <XAxis
            dataKey="date"
            tickFormatter={(date) => moment(date).format("MMM")}
          />
          <YAxis
            dataKey="amount"
            domain={[0, 200000]}
            tickLine={false}
            axisLine={false}
            tickFormatter={(amount) => millify(amount)}
          />
          <Tooltip />

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
