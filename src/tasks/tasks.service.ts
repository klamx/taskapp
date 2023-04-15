import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { UpateTaskDTO } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'first task',
      description: 'Some tasks',
      status: TaskStatus.PENDING,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }
  createTasks(title: string, description: string) {
    const task = {
      id: new Date().toISOString(),
      title,
      description,
      status: TaskStatus.PENDING,
    };

    this.tasks = [...this.tasks, task];

    return task;
  }

  updateTasks(id: string, updatedFields: UpateTaskDTO) {
    const task = this.getTaskById(id);
    const newTask = Object.assign(task, updatedFields);
    this.tasks.map((task) => (task.id === id ? newTask : task));
    return newTask;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTasks(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
