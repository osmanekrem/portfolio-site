import { analytics } from "@/utils/analytics";
import React from "react";
import AnalyticsDashboard from "./components/analytics-dashboard";
import { getDate } from "@/utils";

export default async function AnalyticsPage() {
  const TRACKING_DAYS = 7;

  const pageviews = await analytics.retrieveDays("pageview", 7);

  const totalPageViews = pageviews.reduce((acc, curr) => {
    return (
      acc +
      curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
    );
  }, 0);

  const avgVisitorsPerDay = (totalPageViews / TRACKING_DAYS).toFixed(1);

  const amtVisitorsToday = pageviews
    .filter((ev) => ev.date === getDate())
    .reduce((acc, curr) => {
      return (
        acc +
        curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
      );
    }, 0);

    const topCountriesMap = new Map<string, number>()

    for (let i = 0; i < pageviews.length; i++) {
      const day = pageviews[i];
      if(!day) continue

      for (let j = 0; j < day.events.length; j++) {
        const event = day.events[j];
        if(!event) continue

        const key = Object.keys(event)[0]!
        const value = Object.values(event)[0]!

        const paredKey = JSON.parse(key);
        const country = paredKey?.country;

        if(country) {
          if(topCountriesMap.has(country)) {
            const prevValue = topCountriesMap.get(country)!
            topCountriesMap.set(country, prevValue+value)
          } else {
            topCountriesMap.set(country,value)
          }
        }
      }
    }

    const topCountries = [...topCountriesMap.entries()].sort((a,b) => {
      if(a[1]>b[1]) return -1 
      else return 1
    }).slice(0,5)

  return (
    <div className="flex w-full flex-col space-y-8 py-8">
      <h1 className="text-3xl font-semibold text-start">Analytics</h1>
      <AnalyticsDashboard
        avgVisitorsPerDay={avgVisitorsPerDay}
        amtVisitorsToday={amtVisitorsToday}
        timeseriesPageViews={pageviews}
        topCountries={topCountries}
      />
    </div>
  );
}
