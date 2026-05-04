import type { TaskStateModel } from "../../models/TaskStateModel";
import { TaskActionTypes, type TaskActionModel } from "./TaskActions";

export function taskReducer(state: TaskStateModel, action: TaskActionModel): TaskStateModel {
    switch(action.type) {
      case TaskActionTypes.START_TASK: {
        return state;
      }
      case TaskActionTypes.INTERRUPT_TASK: {
      return state;
      }  
      case TaskActionTypes.RESET_TASK: {
        return state
      }
    }
  // Sempre deve retornar o estado
  return state;
};