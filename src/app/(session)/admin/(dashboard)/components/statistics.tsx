import React, {use} from "react";
import {TRACKING_DAYS} from "@/lib/constants/analytics-constant";
import {getDate} from "@/lib/utils";

interface StatisticsProps {
    usersPromise: Promise<number>;
    projectsPromise: Promise<number>;
    postsPromise: Promise<number>;
    totalPageViewPromise:  Promise<{
        date: string
        events: {
            [key: string]: number
        }[]
    }[]>;
    totalPostViewPromise: Promise<{[key: string]: number}[] >
}

export default function Statistics({
                                       usersPromise,
                                       projectsPromise,
                                       postsPromise,
                                        totalPageViewPromise,
                                        totalPostViewPromise
                                   }: StatisticsProps) {
    const users = use(usersPromise);
    const projects = use(projectsPromise);
    const posts = use(postsPromise);
    const totalPageViews = use(totalPageViewPromise);

    const totalPageViewsCount = totalPageViews.reduce((acc, curr) => {
        return acc + curr.events.reduce((sum, event) => sum + event[Object.keys(event)[0]], 0);
    }, 0);

    const avgPageViews = (totalPageViewsCount / TRACKING_DAYS).toFixed(1)

    const visitorsToday = totalPageViews.filter(
        (item) =>item.date === getDate()
    ).reduce((acc, curr) => {
        return acc + curr.events.reduce((sum, event) => sum + event[Object.keys(event)[0]], 0);
    }, 0
    )

    const totalPostsViews = use(totalPostViewPromise);

    const totalPostsViewsCount = totalPostsViews.reduce((acc, curr) => {
        return acc + Object.values(curr)[0];
    }, 0);

    const avgPostsViews = (totalPostsViewsCount / TRACKING_DAYS).toFixed(1);

    const topCountriesMap = new Map<string, number>();

    for(const day of totalPageViews) {
        for(const event of day.events) {
            const key = Object.keys(event)[0];
            const value = Object.values(event)[0];

            const parsedKey = JSON.parse(key);
            const country = parsedKey?.country

            if (country) {
                if (topCountriesMap.has(country)) {
                    topCountriesMap.set(country, topCountriesMap.get(country)! + value);
                } else {
                    topCountriesMap.set(country, value);
                }
            }
        }
    }

    const topCountries = Array.from(topCountriesMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([country, count]) => ({ country, count }));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium">Total Projects</h3>
                <p className="text-2xl font-bold">{projects}</p>
            </div>
            <div className="bg-card border border-border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium">Total Users</h3>
                <p className="text-2xl font-bold">{users}</p>
            </div>
            <div className="bg-card border border-border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium">Total Posts</h3>
                <p className="text-2xl font-bold">{posts}</p>
            </div>
            <div className="bg-card border border-border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium">Total Visitors</h3>
                <p className="text-2xl font-bold">{totalPageViewsCount}</p>
            </div>
            <div className="bg-card border border-border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium">Avg. Visitors per Day</h3>
                <p className="text-2xl font-bold">{avgPageViews}</p>
            </div>
            <div className="bg-card border border-border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium">Visitors Today</h3>
                <p className="text-2xl font-bold">{visitorsToday}</p>
            </div>
            <div className="bg-card border border-border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium">Total Post Views</h3>
                <p className="text-2xl font-bold">{totalPostsViewsCount}</p>
            </div>
            <div className="bg-card border border-border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium">Avg. Post Views per Day</h3>
                <p className="text-2xl font-bold">{avgPostsViews}</p>
            </div>
            <div className="bg-card border col-span-full border-border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium">Top Countries</h3>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {topCountries.map((country, index) => (
                        <li key={index} className="text-lg font-medium">
                            {country.country}: {country.count}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
