// lib/fetchTasks.ts
import { fetchDataSourceFromNotion } from "./fetchFromNotion";

export type Task = {
  id: string;
  projectName: string;
  status: string;
  completion: number; // percentage (0–100)
};

export async function fetchTasks(): Promise<Task[]> {
  const data = await fetchDataSourceFromNotion("NOTION_TASKS_DATASOURCE_ID");

  if (!data?.results) return [];

  const tasks: Task[] = data.results.map((page: any) => {
    const properties = page.properties;

    const projectName =
      properties["Project name"]?.title?.[0]?.plain_text ?? "Untitled";
    const status = properties["Status"]?.status?.name ?? "Unknown";
    const completionRaw = properties["Completion"]?.rollup?.number ?? 0;
    const completion = completionRaw * 100; // convert 0.5 → 50%

    return {
      id: page.id,
      projectName,
      status,
      completion,
    };
  });

  console.log(tasks);

  return tasks;
}
