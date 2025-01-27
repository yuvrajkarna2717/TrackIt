const fs = require("fs-extra");
const { tasksFilePath } = require("../config/paths");

// Ensure tasks.json exists
function initializeFile() {
  if (!fs.existsSync(tasksFilePath)) {
    fs.writeJsonSync(tasksFilePath, {});
  }
}

// Read tasks.json
function readTasks() {
  initializeFile();
  return fs.readJsonSync(tasksFilePath);
}

// Write to tasks.json
function writeTasks(tasks) {
  fs.writeJsonSync(tasksFilePath, tasks, { spaces: 2 });
}

module.exports = {
  initializeFile,
  readTasks,
  writeTasks,
};
