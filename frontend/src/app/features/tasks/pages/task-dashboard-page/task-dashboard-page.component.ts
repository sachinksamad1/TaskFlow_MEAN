import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Example Material Module

// Import the TaskListComponent AFTER you create it (see next section)
import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  selector: 'app-task-dashboard-page',
  standalone: true,
  // --- Import necessary modules/components here ---
  imports: [
    CommonModule,
    MatCardModule, // Example: Wrap content in a card
    TaskListComponent // Make TaskListComponent available in the template
  ],
  templateUrl: './task-dashboard-page.component.html',
  styleUrls: ['./task-dashboard-page.component.scss']
})
export class TaskDashboardPageComponent {
  // Logic for the dashboard page itself (if any) can go here.
  // Often, this component primarily acts as a layout container.
}