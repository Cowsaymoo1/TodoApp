import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="size=12 mx-auto text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "No active tasks. Enjoy your free time!"
              : filter === "completed"
              ? "No completed tasks yet. Start completing some tasks!"
              : "Your task list is empty. Add a new task to get started!"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "All"
              ? "Add tasks to stay organized and productive."
              : `Switch to "All" to see your ${
                  filter === "active" ? "completed" : "active"
                } tasks`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
