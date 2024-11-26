import { Injectable } from '@nestjs/common';
import { UpdateTodoDto } from './dto/updateTodoDto';
import { createTodoDto } from './dto/createTodoDto';
import { Todo } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  private todos = [
    // { id: "1", name: "Todo Task", description: "This todo task is to perform some CURD operation", date: new Date() },
    // { id: "2", name: "Create Todo", description: "We need to create todo list", date: new Date() },
    // { id: "3", name: "Update Todo", description: "We need to update todo list", date: new Date()}
  ]

  async create(createTodoDto: createTodoDto): Promise<Todo> {
    const newData: Prisma.TodoUncheckedCreateInput = {
      title: createTodoDto.name,
      description: createTodoDto.description || null,
      date: new Date(),
    };
    
    return this.prisma.todo.create({ data: newData });
  }
  
  

  gettodo() {
    return this.todos;
  }
  

  findById(id: string) {
    const todo = this.todos.find(todo => todo.id === id);
    return todo || { message: "Todo not found"}; 
  }

  update(id : string, updateTodoDto : UpdateTodoDto){
    const todoIndex = this.todos.findIndex(todo => todo.id === id);

    this.todos[todoIndex] = { ...this.todos[todoIndex], ...updateTodoDto };
    return this.todos[todoIndex];
  }

  delete(id : string){
    this.todos = this.todos.filter(todo => todo.id !== id); 
    return {message : "Todo Deleted"}
  }

}
