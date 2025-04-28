// frontend/src/app/app-routing.module.ts (or app.routes.ts)
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tasks',
    // Lazy load the task routes
    loadChildren: () => import('./features/tasks/tasks.routes').then(m => m.TASKS_ROUTES)
  },
  {
    path: '', // Default route redirects to tasks
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: '**', // Wildcard route for 404 - optional
    redirectTo: '/tasks' // Or a dedicated NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }