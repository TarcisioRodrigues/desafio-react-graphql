import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Task {
  id: string;
  content: string;
}

interface TaskMap {
  [key: string]: Task[];
}

const initialTasks: TaskMap = {
  fazer: [
    { id: "skil", content: "Tarefa 1" },
    { id: "slqew", content: "Tarefa 2" },
    { id: "pae", content: "Tarefa 3" },
  ],
  progresso: [],
  concluida: [],
};

export const Kanban: React.FC = () => {
  const [tasks, setTasks] = useState<TaskMap>(initialTasks);
  const getCount = (columnId: string) => tasks[columnId].length;
  const [columns, setColumns] = useState<string[]>(Object.keys(initialTasks));
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
  
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;
  
    const sourceTasks = [...tasks[source.droppableId]];
    const destinationTasks = [...tasks[destination.droppableId]];
  
   
    const [removed] = sourceTasks.splice(source.index, 1);
  
    destinationTasks.splice(destination.index, 0, removed);
  
    setTasks(prevTasks => ({
      ...prevTasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destinationTasks,
    }));
  };
  const addColumn = () => {
    const newColumnId = `col-${columns.length + 1}`;
    setColumns([...columns, newColumnId]);
    setTasks(prevTasks => ({ ...prevTasks, [newColumnId]: [] }));
  };  
  const removeColumn = (columnId: string) => {
    const updatedColumns = columns.filter(col => col !== columnId);
    const updatedTasks = { ...tasks };
    if(columns.length===3){
      return 
    }else{
      delete updatedTasks[columnId];
    setColumns(updatedColumns);
    setTasks(updatedTasks);
    }
  };
  return (
    <>
    <div className="flex justify-end mb-5">
      <Button className="bg-green-500 text-white py-2 px-4 rounded justify-end" onClick={addColumn}>Adicionar Coluna +</Button>
      </div>
    < div className="flex">
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="text-center flex h-screen">
      
        {Object.keys(tasks).map((columnId) => (
          <div key={columnId} className="flex flex-col items-center mx-3">
            <Badge className="bg-blue-500 mb-2">
              <h2 className="text-white text-lg font-bold"> 
                {columnId.toUpperCase()} ({getCount(columnId)})
                <Button className=" bg-transparent text-white py-2 px-4 rounded mt-2" onClick={() => removeColumn(columnId)}>-</Button>
              </h2>
            </Badge>
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="p-2 bg-gray-100 rounded-md w-60"
                >
                  {tasks[columnId].map((task, index) => (
                  <Draggable
                  key={task.id.toString()}
                  draggableId={task.id.toString()}
                  index={index}
                  
                >
                 {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <h4 className="p-4 bg-red-500 rounded-md mb-2">{task.content}</h4>
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


