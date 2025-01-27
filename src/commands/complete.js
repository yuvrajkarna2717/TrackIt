const { readTasks, writeTasks } = require("../utils/fileHandler");

exports.command = "complete";
exports.describe = "Mark a task as completed";

exports.builder = {
  taskName: {
    type: "string",
    demandOption: true,
    describe: "Task name/category",
  },
  title: {
    type: "string",
    demandOption: true,
    describe: "Task title to mark as completed",
  },
};

exports.handler = (argv) => {
  const tasks = readTasks();
  const { taskName, title } = argv;

  if (!tasks[taskName]) {
    console.log(`Task category "${taskName}" not found.`);
    return;
  }

  const taskIndex = tasks[taskName].findIndex((task) => task.title === title);

  if (taskIndex === -1) {
    console.log(`Task "${title}" not found in category "${taskName}".`);
    return;
  }

  if (tasks[taskName][taskIndex].status === "completed") {
    console.log(`Task "${title}" is already marked as completed.`);
    return;
  }

  tasks[taskName][taskIndex].status = "completed";
  writeTasks(tasks);
  console.log(`Task "${title}" marked as completed in category "${taskName}".`);
};
