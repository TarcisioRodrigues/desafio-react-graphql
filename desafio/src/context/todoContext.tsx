import React, { createContext, useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

interface Task {
  id: string;
  content: string;
}

interface TaskMap {
  [key: string]: Task[];
}

interface TodoContextType {
  tasks: TaskMap;
  columns: string[];
  onDragEnd: (result: DropResult) => void;
  addColumn: () => void;
  removeColumn: (columnId: string) => void;
  getCount: (columnId: string) => number;
  tasksCount:number[]
}

const initialTasks: TaskMap = {
  todo: [
    { id: "task-1", content: 'Tarefa 1' },
    { id: "task-2", content: 'Tarefa 2' },
    { id: "task-3", content: 'Tarefa 3' },
  ],
  inProgress: [],
  done: [],
};

const TodoContext = createContext<TodoContextType>({
  tasks: initialTasks,
  columns: Object.keys(initialTasks),
  onDragEnd: () => {},
  addColumn: () => {},
  removeColumn: () => {},
  getCount: () => 0,
  tasksCount: [],
  
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskMap>(initialTasks);
  const [tasksCount, setTasksCount] = useState<number[]>([]);
  const getCount = (columnId: string) => tasks[columnId].length;
  const [columns, setColumns] = useState<string[]>(Object.keys(initialTasks));

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

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
    if (columns.length === 3) {
      return;
    } else {
      const updatedColumns = columns.filter(col => col !== columnId);
      const updatedTasks = { ...tasks };
      delete updatedTasks[columnId];
      setColumns(updatedColumns);
      setTasks(updatedTasks);
    }
  };
  useEffect(() => {
    const updatedTasksCount = columns.map(columnId => tasks[columnId].length);
    setTasksCount(updatedTasksCount);
  }, [tasks, columns]);

  return (
    <TodoContext.Provider value={{ tasks, columns, onDragEnd, addColumn, removeColumn ,getCount,tasksCount}}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => React.useContext(TodoContext);
