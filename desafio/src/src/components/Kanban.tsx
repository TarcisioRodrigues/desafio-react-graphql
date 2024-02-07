import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable
} from "react-beautiful-dnd";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";



import { useTodoContext } from "../../context/todoContext"

export const Kanban: React.FC = () => {
  const {addColumn,onDragEnd,removeColumn,tasks,getCount}=useTodoContext()
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
                  key={task.id}
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


