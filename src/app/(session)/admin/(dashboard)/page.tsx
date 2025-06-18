import { db } from "@/db/drizzle";
import { projects, users } from "@/db/schema";
import React, { Suspense } from "react";
import Statistics from "./components/statistics";

export default function DashboardPage() {
  const usersPromise = db
    .select()
    .from(users)
    .then((res) => res.length);

  const projectsPromise = db
    .select()
    .from(projects)
    .then((res) => res.length);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Statistics
          usersPromise={usersPromise}
          projectsPromise={projectsPromise}
        />
      </Suspense>
    </div>
  );
}
