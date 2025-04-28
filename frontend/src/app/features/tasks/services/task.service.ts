// frontend/src/app/features/tasks/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model'; // Adjust path if needed
import { environment } from '../../../../environments/environment'; // For API URL

@Injectable({
  providedIn: 'root' // Singleton service available app-wide
})
export class TaskService {
  private apiUrl = environment.apiUrl + '/api/tasks'; // Use environment variable

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`);
  }

  // Define a type for the creation payload, omitting generated fields
  createTask(taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, taskData);
  }

  // Define a type for the update payload, making fields optional
  updateTask(id: string, taskData: Partial<Omit<Task, '_id' | 'createdAt' | 'updatedAt'>>): Observable<Task> {
    return this.http.put<Task>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`, taskData);
  }

  deleteTask(id: string): Observable<{ msg: string }> { // Match backend response
    return this.http.delete<{ msg: string }>(`<span class="math-inline">\{this\.apiUrl\}/</span>{id}`);
  }
}