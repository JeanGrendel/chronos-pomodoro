import { useReducer, useState } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

type ActionType = {
  type: string;
  payload?: number;
};

export function TaskContextProviderTeste({children}: TaskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);
  const [myState, dispatch] = useReducer(
    (state, action: ActionType) => {

    switch (action.type) {
      case 'INCREMENT': {
        if (!action.payload) return state;

        return {
          ...state,
          secondsRemaining: state.secondsRemaining + action.payload,
        };
      }
    }

    return state;
  },
  { 
    secondsRemaining: 0 
  },
);

  return (
  <TaskContext.Provider value={{ state, setState }}>
    <h1>o Estado é {JSON.stringify(myState)}</h1>
    <button onClick={() => {dispatch({ type: 'INCREMENT', payload: 10 })}}>Incrementar</button>
  </TaskContext.Provider>
  );
};