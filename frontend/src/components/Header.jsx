import React from "react";

const Header = () => {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text">
        Todo App
      </h1>
      <p className="text-muted-foreground">
        Manage your tasks efficiently and stay organized!
      </p>
    </div>
  );
};

export default Header;
