import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateTodoDto } from './dto/updateTodoDto';
import { createTodoDto } from './dto/createTodoDto';

@Controller("/todo")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/add')
  createtodo(@Body() createTodoDto : createTodoDto){
    return this.appService.create(createTodoDto)
  }

  @Get('/xyz')
  gettodo() {
    return this.appService.gettodo();
  }

  @Get(':id')
  getTodoById(@Param('id') id: string) {
    return this.appService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.appService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.delete(id);
  }

}
