const { readTasks } = require("../utils/fileHandler");
const fs = require("fs");
const { Parser } = require("json2csv");
const xlsx = require("xlsx");

exports.command = "export";
exports.describe = "Export tasks to a CSV, JSON, or Excel file";

exports.builder = {
  format: {
    type: "string",
    choices: ["csv", "json", "excel"],
    demandOption: true,
    describe: "Export format: csv, json, or excel",
  },
  output: {
    type: "string",
    default: "./exported_tasks",
    describe: "Output file name (without extension)",
  },
};

exports.handler = (argv) => {
  const tasks = readTasks();
  const { format, output } = argv;

  if (Object.keys(tasks).length === 0) {
    console.log("No tasks available to export.");
    return;
  }

  try {
    if (format === "csv") {
      exportToCSV(tasks, output);
    } else if (format === "json") {
      exportToJSON(tasks, output);
    } else if (format === "excel") {
      exportToExcel(tasks, output);
    }
    console.log(`Tasks successfully exported as ${format.toUpperCase()} file.`);
  } catch (error) {
    console.error("Error exporting tasks:", error.message);
  }
};

const exportToCSV = (tasks, output) => {
  const data = [];
  for (const [category, taskList] of Object.entries(tasks)) {
    taskList.forEach((task) => {
      data.push({
        Category: category,
        Title: task.title,
        Priority: task.priority,
        Due: task.due,
        Status: task.status,
      });
    });
  }

  const parser = new Parser();
  const csv = parser.parse(data);
  fs.writeFileSync(`${output}.csv`, csv);
};

const exportToJSON = (tasks, output) => {
  fs.writeFileSync(`${output}.json`, JSON.stringify(tasks, null, 2));
};

const exportToExcel = (tasks, output) => {
  const workbook = xlsx.utils.book_new();
  for (const [category, taskList] of Object.entries(tasks)) {
    const worksheet = xlsx.utils.json_to_sheet(
      taskList.map((task, index) => ({
        ID: index + 1,
        Title: task.title,
        Priority: task.priority,
        Due: task.due,
        Status: task.status,
      }))
    );
    xlsx.utils.book_append_sheet(workbook, worksheet, category);
  }
  xlsx.writeFile(workbook, `${output}.xlsx`);
};
