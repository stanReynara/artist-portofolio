interface SubTask {
  name: string;
  status: string;
}

interface TaskCardsProps {
  taskNames: SubTask[];
}

const todo = ["Waitlist", "In Queue"];
const inProgress = ["Planning", "WIP", "Paused", "In Progress"];
const done = ["Ready", "Done", "Canceled"];

export default function TaskCards({ taskNames }: TaskCardsProps) {
  const getStatusColor = (status: string) => {
    if (todo.includes(status))
      return "bg-yellow-100 border-yellow-400 text-yellow-700";
    if (inProgress.includes(status))
      return "bg-blue-100 border-blue-400 text-blue-700";
    if (done.includes(status))
      return "bg-green-100 border-green-400 text-green-700";
    return "bg-gray-100 border-gray-400 text-gray-700";
  };

  return (
    <div className="w-full flex flex-wrap gap-4 justify-between">
      {taskNames.map((task, index) => (
        <div
          key={index}
          className={`card flex-1 border shadow-md ${getStatusColor(
            task.status
          )} transition-transform hover:scale-105`}
        >
          <div className="card-body p-4">
            <h2 className="card-title text-base font-semibold">{task.name}</h2>
            <p className="text-sm opacity-80">{task.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
