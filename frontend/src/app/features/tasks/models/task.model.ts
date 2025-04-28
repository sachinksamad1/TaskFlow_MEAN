// frontend/src/app/features/tasks/models/task.model.ts
export interface Task {
    _id: string; // MongoDB uses _id
    title: string;
    description?: string; // Optional property
    status: 'Todo' | 'In Progress' | 'Done';
    createdAt: Date;
    updatedAt: Date;
  }