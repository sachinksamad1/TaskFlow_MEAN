// frontend/src/app/features/tasks/tasks.routes.ts
import { Routes } from '@angular/router';
import { TaskDashboardPageComponent } from './pages/task-dashboard-page/task-dashboard-page.component'; // Assuming you create this page component

// Define task-specific routes here
export const TASKS_ROUTES: Routes = [
  {
    path: '', // Default route for the tasks feature
    component: TaskDashboardPageComponent,
    // children routes if needed (e.g., for details view on the same page layout)
  },
  // Example: Route for a dedicated editor page
  // { path: 'new', component: TaskEditorPageComponent },
  // { path: 'edit/:id', component: TaskEditorPageComponent },
  // { path: ':id', component: TaskDetailsPageComponent }, // If using separate details page
];