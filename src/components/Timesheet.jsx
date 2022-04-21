import React from "react";

export default function Timesheet({ desc, onDeleteTimesheet }) {
  return (
    <div>
      <div className="desc">{desc}</div>
      <DeleteButton onDelete={onDeleteTimesheet}>Delete Timesheet</DeleteButton>
    </div>
  );
}

function DeleteButton({ onDelete, children }) {
  return <button onClick={onDelete}> X {children} </button>;
}
