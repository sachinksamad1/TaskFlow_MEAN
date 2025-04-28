import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBar for potential inline errors
import { MatProgressBarModule } from '@angular/material/progress-bar'; // For loading indicator

import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { HttpErrorResponse } from '@angular/common/http'; // To access error details

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule, // Needed if using snackbar inside dialog
    MatProgressBarModule // Import progress bar
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private snackBar = inject(MatSnackBar);
  public dialogRef = inject(MatDialogRef<TaskFormComponent>);
  @Inject(MAT_DIALOG_DATA) public data: { task: Task | null } = { task: null };

  taskForm!: FormGroup;
  isEditMode = false;
  isLoading = false; // Separate loading state for the form submission
  statusOptions: string[] = ['Todo', 'In Progress', 'Done'];

  ngOnInit(): void {
    this.isEditMode = !!this.data.task?._id; // More reliable check using _id

    this.taskForm = this.fb.group({
      // Provide initial values and validators
      title: [this.data.task?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [this.data.task?.description || ''],
      status: [this.data.task?.status || this.statusOptions[0], Validators.required]
    });

    // No need to patchValue here if initial values are set above
    // if (this.isEditMode && this.data.task) {
    //   this.taskForm.patchValue(this.data.task);
    // }
  }

  get f() { return this.taskForm.controls; } // Form control getter

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched(); // Show validation errors
      this.snackBar.open('Please fix the errors in the form.', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true; // Start loading indicator
    const formData = this.taskForm.value; // Get form data

    // Determine which service method to call
    const operation$ = this.isEditMode && this.data.task?._id
      ? this.taskService.updateTask(this.data.task._id, formData)
      : this.taskService.createTask(formData);

    operation$.subscribe({
      next: (savedTask) => {
        // Success! Close the dialog and pass 'true' to signal refresh
        this.dialogRef.close(true);
        // SnackBar notification is handled by the list component after refresh
      },
      error: (err: HttpErrorResponse) => {
        console.error("Form submission error:", err);
        // Try to get specific error message from backend response
        const errorMsg = err.error?.msg || err.error?.message || 'An unknown error occurred.';
        this.snackBar.open(`Error: ${errorMsg}`, 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        this.isLoading = false; // Stop loading indicator on error
      },
      // complete: () => {
         // No need to set isLoading = false here if dialog closes on success
      // }
    });
  }

  onCancel(): void {
    // Close the dialog without sending any success signal
    this.dialogRef.close(false);
  }
}