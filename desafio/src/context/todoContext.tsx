// import { client } from '../src/lib/apollo';
// import { gql } from '@apollo/client';
import React, { createContext, useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
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
  createTask: (content: string) => void;
  deleteTask: (taskId: string) => void;
  updateColumnName: (columnId: string, newName: string) => void;
  tasksCount: number[];
}

//  const GET_TASKS = gql`
//    query {
//      listtasks {
//        id
//        content
//      }
//    }
//  `;

const TodoContext = createContext<TodoContextType>({
  tasks: {},
  columns: Object.keys([]),
  onDragEnd: () => {},
  addColumn: () => {},
  removeColumn: () => {},
  getCount: () => 0,
  tasksCount: [],
  createTask: () => {},
  deleteTask: () => {},
  updateColumnName: () => {}

});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  // const [tasks, setTasks] = useState<TaskMap>({});

  const [tasks, setTasks] = useState<TaskMap>({
    AFazer: [],
    Progresso: [],
    Concluida: [],
  });
  const [tasksCount, setTasksCount] = useState<number[]>([]);
  const getCount = (columnId: string) => tasks[columnId].length;
  const [columns, setColumns] = useState<string[]>(Object.keys([]));

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceTasks = [...tasks[source.droppableId]];
    const destinationTasks = [...tasks[destination.droppableId]];

    const [movedTask] = sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, movedTask);

    const updatedTasks = {
      ...tasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destinationTasks,
    };

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addColumn = () => {
    const newColumnId = `col-${columns.length + 1}`;
    setColumns([...columns, newColumnId]);
    setTasks((prevTasks) => ({ ...prevTasks, [newColumnId]: [] }));
  };
  const updateColumnName = (columnId: string, newName: string) => {
    setColumns(prevColumns => prevColumns.map(col => (col === columnId ? newName : col)));
  };
  const removeColumn = (columnId: string) => {
    if (columns.length === 3) {
      return;
    } else {
      const updatedColumns = columns.filter((col) => col !== columnId);
      const updatedTasks = { ...tasks };
      delete updatedTasks[columnId];
      setColumns(updatedColumns);
      setTasks(updatedTasks);
    }
  };
  const deleteTask = (taskId: string) => {
    const updatedTasks = { ...tasks };
    Object.keys(updatedTasks).forEach((columnId) => {
      updatedTasks[columnId] = updatedTasks[columnId].filter(
        (task) => task.id !== taskId
      );
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      setColumns(Object.keys(JSON.parse(storedTasks)));
    } else {
      setColumns([]);
    }
  }, []);
  const createTask = (content: string) => {
    const newTask: Task = {
      id: uuidv4(),
      content: content,
    };
    const updatedTasks = { ...tasks };
    updatedTasks["todo"] = [...updatedTasks["todo"], newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {

  //       const { data } = await client.query({
  //         query: GET_TASKS,
  //       });
  //       setTasks(data)

  //       const tasksFromQuery: Task[] = data.listtasks;

  //       setTasks({
  //         todo: tasksFromQuery,
  //         inProgress: [],
  //         done: [],
  //       });

  //       setColumns(['todo', 'inProgress', 'done']);
  //     } catch (error) {
  //       console.error('Erro ao buscar dados:', error);
  //     }
  //   };

  //   fetchTasks();
  // }, [client]);

  useEffect(() => {
    const updatedTasksCount = columns.map((columnId) => tasks[columnId].length);
    setTasksCount(updatedTasksCount);
  }, [tasks, columns]);

  return (
    <TodoContext.Provider
      value={{
        tasks,
        deleteTask,
        columns: columns || [],
        onDragEnd,
        addColumn,
        removeColumn,
        getCount,
        tasksCount,
        createTask,
        updateColumnName,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => React.useContext(TodoContext);
