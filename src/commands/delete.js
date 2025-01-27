const { readTasks, writeTasks } = require("../utils/fileHandler");

exports.command = "delete";
exports.describe = "Delete a task by category and ID";

exports.builder = {
  taskName: {
    type: "string",
    demandOption: true,
    describe: "Task name/category",
  },
  id: { type: "number", demandOption: true, describe: "Task ID to delete" },
};

exports.handler = (argv) => {
  const tasks = readTasks();
  const { taskName, id } = argv;

  if (!tasks[taskName]) {
    console.log(`Category "${taskName}" not found.`);
    return;
  }

  const initialLength = tasks[taskName].length;
  tasks[taskName] = tasks[taskName].filter((task) => task.id !== id);

  if (tasks[taskName].length < initialLength) {
    writeTasks(tasks);
    console.log(`Task with ID ${id} deleted from "${taskName}".`);
  } else {
    console.log(`Task with ID ${id} not found in "${taskName}".`);
  }
};
