import { db } from "@/db/drizzle";
import {posts, projects, users} from "@/db/schema";
import React, { Suspense } from "react";
import Statistics from "./components/statistics";
import {analytics} from "@/lib/analytics";
import {TRACKING_DAYS} from "@/lib/constants/analytics-constant";
export const dynamic = 'force-dynamic';
export default async function DashboardPage() {
  const usersPromise = db
    .select()
    .from(users)
    .then((res) => res.length);

  const projectsPromise = db
    .select()
    .from(projects)
    .then((res) => res.length);

  const postsPromise = db
    .select()
    .from(posts)
    .then((res) => res.length);

  const totalPageViewPromise = analytics.retrieveDays('pageview', TRACKING_DAYS)
  const totalPostViewPromise = analytics.visitorsByPage('pageview','/posts', {
    startsWith: true,
  })
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Statistics
          usersPromise={usersPromise}
          projectsPromise={projectsPromise}
            postsPromise={postsPromise}
            totalPageViewPromise={totalPageViewPromise}
            totalPostViewPromise={totalPostViewPromise}
        />
      </Suspense>

    </div>
  );
}
