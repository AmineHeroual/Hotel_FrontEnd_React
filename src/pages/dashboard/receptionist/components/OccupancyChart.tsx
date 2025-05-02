
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface OccupancyChartProps {
  occupancyData: {
    name: string;
    total: number;
  }[];
  className?: string;
}

export const OccupancyChart: React.FC<OccupancyChartProps> = ({ occupancyData, className }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Room Occupancy</CardTitle>
        <CardDescription>Last 7 days occupancy rate</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={occupancyData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}%`, 'Occupancy']}
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            />
            <Bar
              dataKey="total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
