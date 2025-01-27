const { readTasks } = require("../utils/fileHandler");
const Table = require("cli-table3");

exports.command = "view";
exports.describe = "View all tasks or tasks in a specific category";

exports.builder = {
  taskName: {
    type: "string",
    describe: "View tasks under a specific category",
  },
};

exports.handler = (argv) => {
  const tasks = readTasks();
  const { taskName } = argv;

  if (taskName) {
    if (!tasks[taskName]) {
      console.log(`No tasks found under "${taskName}".`);
      return;
    }

    const table = new Table({
      head: ["ID", "Title", "Priority", "Due", "Status"],
    });
    tasks[taskName].forEach((task) => {
      table.push([task.id, task.title, task.priority, task.due, task.status]);
    });

    console.log(`Tasks under "${taskName}":`);
    console.log(table.toString());
  } else {
    const table = new Table({
      head: ["Category", "ID", "Title", "Priority", "Due", "Status"],
    });
    Object.entries(tasks).forEach(([name, taskList]) => {
      taskList.forEach((task) => {
        table.push([
          name,
          task.id,
          task.title,
          task.priority,
          task.due,
          task.status,
        ]);
      });
    });

    console.log("All tasks:");
    console.log(table.toString());
  }
};
