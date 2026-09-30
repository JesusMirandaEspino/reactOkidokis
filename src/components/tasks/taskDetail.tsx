import React from "react";

interface TaskProps {
  name: string;
  status: string;
}

const TaskDetails: React.FC<TaskProps> = ({name, status}) => {
  return <>
        <span>{name} - {status}</span>
  </>;
};


export default TaskDetails;