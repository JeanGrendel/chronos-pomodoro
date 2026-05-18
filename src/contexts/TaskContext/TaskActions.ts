import type { TaskModel } from "../../models/TaskModel";


export enum TaskActionTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_TASK = 'RESET_TASK',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK',
};

export type TaskActionWithPayload = {
  type: TaskActionTypes.START_TASK;
  payload: TaskModel;
} | {
  type: TaskActionTypes.COUNT_DOWN;
  payload: { secondsRemaining: number };
};

export type TaskActionWithoutPayLoad = {
  type: TaskActionTypes.RESET_TASK;
} | {
  type: TaskActionTypes.INTERRUPT_TASK;
} | {
  type: TaskActionTypes.COMPLETE_TASK;
}

export type TaskActionModel = TaskActionWithPayload | TaskActionWithoutPayLoad;