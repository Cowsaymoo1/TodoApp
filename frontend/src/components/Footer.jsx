import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🎉 Excellent! you completed {completedTasksCount}
                {activeTasksCount > 0 &&
                  `, only ${activeTasksCount} more to do, keep it up!`}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>Let get start doing {activeTasksCount}!</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
