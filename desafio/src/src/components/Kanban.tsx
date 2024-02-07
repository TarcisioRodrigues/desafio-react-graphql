import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useTodoContext } from "../../context/todoContext";
import { FaTrash, FaPlus } from "react-icons/fa";

export const Kanban: React.FC = () => {
  const [taskContent, setTaskContent] = useState("");
  const [editedColumnName, setEditedColumnName] = useState("");
  const {
    addColumn,
    onDragEnd,
    removeColumn,
    tasks,
    getCount,
    createTask,
    deleteTask,
    updateColumnName,
  } = useTodoContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskContent(event.target.value);
  };

  const handleAddTask = () => {
    if (taskContent.trim() !== "") {
      createTask(taskContent);
      setTaskContent("");
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

 

  return (
    <>
      <div className="flex justify-between mb-6 gap-2 ">
        <div className=" flex gap-2">
          <input
            type="text"
            placeholder="Enter task name"
            value={taskContent}
            onChange={handleInputChange}
            className="p-2"
          />
          <Button onClick={handleAddTask}>Add Task</Button>
        </div>
        <Button
          className="bg-green-500 text-white py-2 px-4 rounded justify-end"
          onClick={addColumn}
        >
          <FaPlus /> {""} Column
        </Button>
      </div>
      <div className="flex">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="text-center flex h-screen">
            {Object.keys(tasks).map((columnId) => (
              <div
                key={columnId}
                className="flex flex-col items-center gap-2 mx-2"
              >
                <Badge className="bg-blue-500 mb-1 justify-center p-3">
                  
                <div className="text-center items-center"><h2 className="text-white text-lg font-bold">
                    {columnId.toUpperCase()} ({getCount(columnId)})
                    <Button
                      className=" bg-transparent text-white py-2 px-4 rounded mt-2"
                      onClick={() => removeColumn(columnId)}
                    >
                      <FaTrash />
                    </Button>
                  </h2>
                  </div>
                </Badge>
                <Droppable droppableId={columnId} key={parseInt(columnId)}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="p-2 bg-gray-100 rounded-md w-60"
                    >
                      {tasks[columnId].map((task, index) => (
                        <Draggable
                          key={`${task.id}-${index}`}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className=""
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="flex w-[100%] p-4 text-center items-center justify-center">
                                <h4
                                  className=" bg-red-500 rounded-md w-[80%]"
                                  key={task.id}
                                >
                                  {task.content}{" "}
                                  <Button
                                    className="bg-transparent p-2 "
                                    onClick={() => handleDeleteTask(task.id)}
                                  >
                                    <FaTrash />
                                  </Button>
                                </h4>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  );
};
