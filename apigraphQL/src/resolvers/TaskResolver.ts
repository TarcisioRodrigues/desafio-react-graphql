import { Mutation, Resolver, Arg, Query } from "type-graphql";
import { KanbanBoard, Column, Task } from "../models/Task";

@Resolver()
export class TaskResolver {
  private board: KanbanBoard = {
    columns: [
      { id: "todo", name: "A fazer", tasks: [] },
      { id: "inProgress", name: "Em progresso", tasks: [] },
      { id: "done", name: "Concluído", tasks: [] }
    ]
  };
  private findTaskById(taskId: string): Task | undefined {
 
    for (const column of this.board.columns) {
      const task = column.tasks.find(task => task.id === taskId);
      if (task) {
        return task;
      }
    }
    return undefined; // Se a tarefa não for encontrada
  }

  @Query(() => [Task])
  async listtasks(): Promise<Task[]> {
    
    return this.board.columns.reduce((acc: Task[], column) => [...acc, ...column.tasks], []);
  }
  @Query(() => String)
  @Mutation(() => Task)
  async createTask(@Arg("content") content: string): Promise<Task> {
    const newTask: Task = {
        id: (this.board.columns.reduce((acc, curr) => acc + curr.tasks.length, 0) + 1).toString(), // Gera um ID baseado no número total de tarefas
        content: content
      };
  
      this.board.columns[0].tasks.push(newTask); 
      return newTask;
    
  }

  @Query(() => String)
  @Mutation(() => Column)
  async createColumn(@Arg("name") name: string): Promise<Column> {
    const newColumn: Column = { id: Date.now().toString(), name, tasks: [] };
    this.board.columns.push(newColumn);
    return newColumn;
  }
  @Query(() => String)
  @Mutation(() => Column)
  async updateColumnTasks(
    @Arg("columnId") columnId: string,
    @Arg("newTasks", type => [String]) newTaskIds: string[]
  ): Promise<Column | null> {
    const columnToUpdate = this.board.columns.find((column) => column.id === columnId);
    if (!columnToUpdate) {
      return null; 
    }
  
    
    columnToUpdate.tasks = [];
  
   
    newTaskIds.forEach(taskId => {
      const taskToAdd = this.findTaskById(taskId);
      if (taskToAdd) {
        columnToUpdate.tasks.push(taskToAdd);
      }
    });
  
    return columnToUpdate;
  }

  @Query(() => String)
  @Mutation(() => Column)
  async deleteColumn(@Arg("columnId") columnId: string): Promise<Column | null> {
    const columnIndex = this.board.columns.findIndex((column) => column.id === columnId);
    if (columnIndex === -1) {
      return null; 
    }
    const deletedColumn = this.board.columns.splice(columnIndex, 1)[0];
    return deletedColumn;
  }
}
