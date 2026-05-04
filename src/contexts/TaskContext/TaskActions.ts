import type { TaskModel } from "../../models/TaskModel";


export enum TaskActionTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_TASK = 'RESET_TASK',
};

export type TaskActionWithPayload = {
  type: TaskActionTypes.START_TASK;
  payload: TaskModel;
} | {
  type: TaskActionTypes.INTERRUPT_TASK;
  payload: TaskModel;
};

export type TaskActionWithoutPayLoad = {
  type: TaskActionTypes.RESET_TASK;
};

export type TaskActionModel = TaskActionWithPayload | TaskActionWithoutPayLoad;