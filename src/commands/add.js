const { readTasks, writeTasks } = require("../utils/fileHandler");

exports.command = "add";
exports.describe = "Add a new task";

exports.builder = {
  taskName: {
    type: "string",
    demandOption: true,
    describe: "Task name/category",
  },
  title: { type: "string", demandOption: true, describe: "Task title" },
  priority: {
    type: "string",
    default: "medium",
    describe: "Task priority (low, medium, high)",
  },
  due: {
    type: "string",
    default: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0],
    describe: "Due date (YYYY-MM-DD)",
  },
};

exports.handler = (argv) => {
  const tasks = readTasks();
  const { taskName, title, priority, due } = argv;

  if (!tasks[taskName]) tasks[taskName] = [];
  tasks[taskName].push({
    id: tasks[taskName].length + 1,
    title,
    priority,
    due: due || "N/A",
    status: "pending",
  });

  writeTasks(tasks);
  console.log(`Task "${title}" added under "${taskName}".`);
};
