import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { io } from 'socket.io-client';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  private socket: any;
  private apiUrl = 'http://localhost:3000/todos';
  private todosSubject: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  private todosCache: any[] = [];

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000');
    this.initializeTodos();
  }

  private initializeTodos(): void {
    this.http.get<any[]>(this.apiUrl).subscribe((todos) => {
      this.todosCache = todos;
      this.todosSubject.next(todos);
    });

    this.socket.on('newTodo', (data: any) => {
      this.addOrUpdateTodoInCache(data);
    });

    this.socket.on('updateTodo', (data: any) => {
      this.addOrUpdateTodoInCache(data);
    });

    this.socket.on('deleteTodo', (data: any) => {
      this.removeTodoFromCache(data.id);
    });
  }

  private addOrUpdateTodoInCache(data: any): void {
    const existingTodoIndex = this.todosCache.findIndex(
      (todo) => todo.id === data.id
    );
    if (existingTodoIndex !== -1) {
      this.todosCache[existingTodoIndex] = data; // Update existing todo
    } else {
      this.todosCache.push(data); // Add new todo
    }
    this.todosSubject.next([...this.todosCache]);
  }

  private removeTodoFromCache(id: number): void {
    this.todosCache = this.todosCache.filter((todo) => todo.id !== id);
    this.todosSubject.next([...this.todosCache]);
  }

  getAllTodos(): Observable<any[]> {
    return this.todosSubject.asObservable().pipe(shareReplay(1));
  }

  onNewTodo(callback: (data: any) => void) {
    this.socket.on('newTodo', callback);
  }

  onUpdateTodo(callback: (data: any) => void) {
    this.socket.on('updateTodo', callback);
  }

  onDeleteTodo(callback: (data: any) => void) {
    this.socket.on('deleteTodo', callback);
  }
}
