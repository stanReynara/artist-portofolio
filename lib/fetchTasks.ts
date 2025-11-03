// lib/fetchTasks.ts
import { fetchDataSourceFromNotion } from "./fetchFromNotion";
import { getTaskNamesFromRelation } from "./fetchSubTasksName";

type SubTask = {
  name: string;
  status: string;
};

export type Task = {
  id: string;
  projectName: string;
  status: string;
  completion: number; // percentage (0–100)
  customerName: string;
  taskNames: SubTask[]; // Added to reflect the new field
};

export async function fetchTasks(): Promise<Task[]> {
  const data = await fetchDataSourceFromNotion("NOTION_TASKS_DATASOURCE_ID");

  if (!data?.results) return [];

  // Map + await pattern for async task name fetching
  const tasks: Task[] = await Promise.all(
    data.results.map(async (page: any) => {
      const properties = page.properties;

      const projectName =
        properties["Project name"]?.title?.[0]?.plain_text ?? "Untitled";
      const status = properties["Status"]?.status?.name ?? "Unknown";
      const completionRaw = properties["Completion"]?.rollup?.number ?? 0;
      const completion = completionRaw * 100; // convert 0.5 → 50%
      const customerName = properties["Ordered by"]?.rich_text?.[0]?.plain_text;

      // fetch task names from relation
      const relationArray = properties["Tasks"]?.relation ?? [];
      const taskNames = await getTaskNamesFromRelation(relationArray);

      return {
        id: page.id,
        projectName,
        status,
        completion,
        taskNames,
        customerName,
      };
    })
  );

  console.log("✅ Fetched tasks from Notion", JSON.stringify(tasks, null, 2));

  return tasks;
}
