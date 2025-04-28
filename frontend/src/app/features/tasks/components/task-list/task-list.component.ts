import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core'; // Added ChangeDetectionStrategy
import { CommonModule, DatePipe } from '@angular/common'; // Added DatePipe
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, Subject, BehaviorSubject, switchMap, startWith, tap, catchError, of } from 'rxjs'; // Use BehaviorSubject for isLoading

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe, // Add DatePipe here
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    // TaskFormComponent is implicitly needed by MatDialog.open
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [DatePipe], // Provide DatePipe if not globally provided
  changeDetection: ChangeDetectionStrategy.OnPush // Use OnPush for better performance
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Use BehaviorSubject for isLoading to easily update from anywhere
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable(); // Expose as observable

  tasks$: Observable<Task[]> = of([]);
  private refreshTasks$ = new Subject<void>();

  displayedColumns: string[] = ['title', 'description', 'status', 'createdAt', 'actions'];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks$ = this.refreshTasks$.pipe(
      startWith(undefined), // Trigger immediately on subscribe and on refresh
      tap(() => this.isLoadingSubject.next(true)), // Set loading true
      switchMap(() => this.taskService.getTasks()), // Fetch tasks from service
      tap(() => this.isLoadingSubject.next(false)), // Set loading false on success
      catchError(error => {
        console.error('Error loading tasks:', error);
        this.snackBar.open('Failed to load tasks. Please try again.', 'Close', { duration: 4000, panelClass: 'error-snackbar' });
        this.isLoadingSubject.next(false); // Set loading false on error
        return of([]); // Return empty array to prevent stream error
      })
    );
  }

  triggerRefresh(): void {
    this.refreshTasks$.next(); // Emit signal to re-trigger the loadTasks pipeline
  }

  // --- Dialog Opening Methods ---
  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '450px',
      disableClose: true, // Prevent closing by clicking outside or ESC
      data: { task: null } // No task data means "create" mode
    });

    // Subscribe to dialog close event
    dialogRef.afterClosed().subscribe(result => {
      // If the dialog returned 'true' (our convention for success)
      if (result === true) {
        this.snackBar.open('Task created successfully!', 'Close', { duration: 3000, panelClass: 'success-snackbar' });
        this.triggerRefresh(); // Refresh the task list
      }
    });
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '450px',
      disableClose: true,
      data: { task: { ...task } } // Pass a *copy* of the task object to edit
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.snackBar.open('Task updated successfully!', 'Close', { duration: 3000, panelClass: 'success-snackbar' });
        this.triggerRefresh(); // Refresh the task list
      }
    });
  }

  // --- Delete Method ---
  confirmDeleteTask(taskId: string, taskTitle: string): void {
    // Optional: Use a more robust confirmation dialog (e.g., create a simple dedicated component)
    const confirmation = window.confirm(`Are you sure you want to delete the task "${taskTitle}"?`);

    if (confirmation) {
      this.isLoadingSubject.next(true); // Show loading indicator
      this.taskService.deleteTask(taskId).subscribe({
        next: (response) => {
          this.snackBar.open(response.msg || 'Task deleted successfully!', 'Close', { duration: 3000, panelClass: 'success-snackbar' });
          this.triggerRefresh(); // Refresh list on success (will also turn off loading)
        },
        error: (err) => {
          console.error("Error deleting task: ", err);
          this.snackBar.open('Failed to delete task.', 'Close', { duration: 4000, panelClass: 'error-snackbar' });
          this.isLoadingSubject.next(false); // Ensure loading is turned off on error
        }
        // No need for complete handler if tap(false) in loadTasks handles it
      });
    }
  }
}