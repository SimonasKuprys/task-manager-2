export interface Task {
    id: string;
    taskName: string;
    priority: string;
    description?: string;
    isCompleted: boolean;
    creationDate: Date;
    dueDate?: string;
  }