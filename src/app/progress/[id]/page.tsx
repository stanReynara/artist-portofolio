import { Heading2 } from "@components/Typography";
// import tasks from "@config/tasks.json";
import { fetchTasks } from "lib/fetchTasks";
import TaskCards from "@components/TasksCard";
type SubTask = {
  name: string;
  status: string;
};

type Task = {
  id: string;
  projectName: string;
  status: string;
  completion: number;
  taskNames: SubTask[];
  customerName: string;
};

export default async function ProgressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ unwrap the params promise

  // Fetch from local json
  // const task = (tasks as Task[]).find((t) => t.id === id);

  // ✅ Fetch tasks from Notion API instead of local JSON
  const tasks = await fetchTasks();
  const task = (tasks as Task[]).find((t) => t.id === id);

  if (!task) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-semibold text-neutral">Task not found</h1>
        <p className="text-neutral mt-2">
          No project found for ID: <code>{id}</code>
        </p>
      </div>
    );
  }

  const todo = ["Waitlist", "In Queue"];
  const inProgress = ["Planning", "WIP", "Paused"];
  const done = ["Ready", "Done", "Canceled"];

  // ✅ Count how many subtasks are done
  const doneCount = task.taskNames.filter((t) =>
    done.includes(t.status)
  ).length;
  const subTaskCount = task.taskNames.length;

  return (
    <div className="flex flex-col items-center">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <Heading2
            color="text-success"
            className="drop-shadow-[0_0_3px_rgba(0,0,0,0.3)]"
          >
            {task.projectName}
          </Heading2>
          <Heading2 color="text-neutral">
            Commission by: {task.customerName}
          </Heading2>
          <div className="flex items-center gap-2">
            <Heading2 color="text-neutral">Status:</Heading2>
            {(() => {
              let statusColor = "status-info"; // default
              if (task.status === "Canceled") statusColor = "status-error";
              else if (todo.includes(task.status))
                statusColor = "status-warning";
              else if (inProgress.includes(task.status))
                statusColor = "status-info";
              else if (done.includes(task.status))
                statusColor = "status-success";

              return (
                <>
                  <div className={`status ${statusColor} animate-bounce`}></div>
                  <p className="text-lg text-neutral">{task.status}</p>
                </>
              );
            })()}
          </div>

          <div className="flex items-center gap-2">
            <p className="text-lg text-neutral text-center">
              {doneCount} / {subTaskCount}
            </p>
          </div>

          <progress
            className={`progress w-full ${
              task.completion === 0
                ? "progress-warning"
                : task.completion === 100
                ? "progress-success"
                : "progress-info"
            }`}
            value={task.completion}
            max="100"
          ></progress>
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex flex-col justify-center items-center w-full">
        <Heading2 color="text-neutral" className="mb-4">
          Tasks:
        </Heading2>
        <TaskCards taskNames={task.taskNames} />
      </div>
    </div>
  );
}
