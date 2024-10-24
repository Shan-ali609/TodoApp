import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});
export const TaskModel =
  mongoose.models.tasks || mongoose.model("tasks", taskSchema);
