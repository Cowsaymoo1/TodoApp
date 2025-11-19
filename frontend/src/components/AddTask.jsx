import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setnewTaskTitle] = useState("");
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        toast.success(`Task ${newTaskTitle} add success!`);
        handleNewTaskAdded();
      } catch (error) {
        console.error("An error occurred while adding a new task.", error);
        toast.error("An error occurred while adding a new task.");
      }
      setnewTaskTitle("");
    } else {
      toast.error("You need to enter the task");
    }
  };

  const handleKeyPress = (even) => {
    if (even.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-primary/25 shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Enter new task..."
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(even) => setnewTaskTitle(even.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Add Task
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
