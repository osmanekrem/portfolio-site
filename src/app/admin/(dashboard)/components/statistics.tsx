import React, { use } from "react";

export default function Statistics({
  usersPromise,
  projectsPromise,
}: {
  usersPromise: Promise<number>;
  projectsPromise: Promise<number>;
}) {
  const users = use(usersPromise);
  const projects = use(projectsPromise);

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
    </div>
  );
}
