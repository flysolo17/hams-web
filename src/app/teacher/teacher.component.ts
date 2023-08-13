import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RealtimeService } from '../services/realtime.service';
import { Todos } from '../models/Todos';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit {
  todos: Todos[] = [];
  constructor(
    private location: Location,
    private realtimeService: RealtimeService
  ) {}
  ngOnInit(): void {
    this.realtimeService.getAllTodos().subscribe((todos) => {
      this.todos = todos;
    });
    // Listen to the 'newTodo' event and update the UI when a new todo is added
    this.realtimeService.onNewTodo((data: any) => {
      this.todos.push(data);
    });

    // Listen to the 'updateTodo' event and update the UI when a todo is updated
    this.realtimeService.onUpdateTodo((data: any) => {
      const index = this.todos.findIndex((todo) => todo.id === data.id);
      if (index !== -1) {
        this.todos[index] = data;
      }
    });

    // Listen to the 'deleteTodo' event and update the UI when a todo is deleted
    this.realtimeService.onDeleteTodo((data: any) => {
      this.todos = this.todos.filter((todo) => todo.id !== data.id);
    });
  }
  logout() {
    localStorage.clear();
    this.location.back();
  }
}
