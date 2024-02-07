import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;
}

@ObjectType()
export class Column {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Task])
  tasks: Task[];
}

@ObjectType()
export class KanbanBoard {
  @Field(() => [Column])
  columns: Column[];
}
