"use client";

import React from "react";
import Card from "./card";
import { analytics } from "@/utils/analytics";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ReactCountryFlag from "react-country-flag";
import { cn } from "@/lib/utils";
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "lucide-react";

type AnalyticsDashboardProps = {
  avgVisitorsPerDay: string;
  amtVisitorsToday: number;
  timeseriesPageViews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
  topCountries: [string, number][];
};

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0;
  const isNeutral = percentage === 0;
  const isNegative = percentage < 0;

  if (isNaN(percentage)) return null;

  const positiveClassname = "bg-green-900/25 text-green-400 ring-green-400/25";
  const neutralClassname = "bg-zinc-900/25 text-zinc-400 ring-zinc-400/25";
  const negativeClassname = "bg-red-900/25 text-red-400 ring-red-400/25";

  return (
    <span
      className={cn(
        "inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset",
        isPositive
          ? positiveClassname
          : isNeutral
          ? neutralClassname
          : negativeClassname
      )}
    >
      {isPositive ? <ArrowUpRightIcon className="h-3 w-3" /> : null}
      {isNeutral ? <ArrowRightIcon className="h-3 w-3" /> : null}
      {isNegative ? <ArrowDownRightIcon className="h-3 w-3" /> : null}
      {percentage.toFixed(1)}%
    </span>
  );
};

export default function AnalyticsDashboard({
  avgVisitorsPerDay,
  amtVisitorsToday,
  timeseriesPageViews,
  topCountries,
}: AnalyticsDashboardProps) {
  console.log(topCountries);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="flex flex-col gap-y-2">
        <p className="text-card-foreground font-medium">Avg. visitors/day</p>
        <p className="text-3xl font-semibold">{avgVisitorsPerDay}</p>
      </Card>
      <Card className="flex flex-col gap-y-2">
        <p className="flex gap-2.5 items-center text-card-foreground font-medium">
          Visitors today
          <Badge
            percentage={
              (amtVisitorsToday / Number(avgVisitorsPerDay) - 1) * 100
            }
          />
        </p>
        <p className="text-3xl font-semibold">{amtVisitorsToday}</p>
      </Card>
      <Card className="col-span-full flex flex-col sm:grid grid-cols-4 gap-4">
        <h2 className="text-card-foreground text-center sm:text-left font-semibold text-xl">
          This week top visitors:
        </h2>
        <div className="col-span-3 flex items-center justify-between flex-wrap gap-6">
          {topCountries?.map(([countryCode, number]) => {
            return (
              <div
                key={countryCode}
                className="flex items-center gap-2 font-medium"
              >
                <p className="hidden sm:block font-light">{countryCode}</p>
                <ReactCountryFlag
                  className="text-5xl sm:text-3xl"
                  svg
                  countryCode={countryCode}
                />
                <p className="">{number}</p>
              </div>
            );
          })}
        </div>
      </Card>
      <Card className="col-span-full">
        {timeseriesPageViews ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
              data={timeseriesPageViews.map((day) => ({
                name: day.date,
                visitors: day.events.reduce(
                  (acc, curr) => acc + Object.values(curr)[0]!,
                  0
                ),
              }))}
            >
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
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "calc(var(--radius) - 2px)",
                }}
                cursor={false}
              />
              <Bar
                dataKey="visitors"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : null}
      </Card>
    </div>
  );
}
