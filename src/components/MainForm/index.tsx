import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import DefaultButton from "../DefaultButton";
import DefaultInput from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleTipe } from "../../utils/getNextCycleTipe";
import { TaskActionTypes } from "../../contexts/TaskContext/TaskActions";
import { Tips } from "../Tips";
import { showMessage } from "../../adapters/showMessage";

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleTipe(nextCycle);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

  function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) return;
    
    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warning('Nome da tarefa é parâmetro obrigatório.');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask() {
    showMessage.dismiss();
    showMessage.error('Tarefa interrompida!')
    dispatch({type: TaskActionTypes.INTERRUPT_TASK})
  }

  return (
      <form onSubmit={handleCreateNewTask} className='form' action=''>
        <div className='formRow'>
          <DefaultInput id='meuInput' type='text' labelText='Task' placeholder='Digite algo' ref={taskNameInput} disabled={!!state.activeTask} defaultValue={lastTaskName} />
        </div>

        <div className='formRow'>
          <Tips />
        </div>

        {state.currentCycle > 0 && (
          <div className='formRow'>
            <Cycles />
          </div>
        )}
        <div className='formRow'>
          {!state.activeTask ? (
            <DefaultButton aria-label='Iniciar Nova Tarefa' title="Iniciar Nova Tarefa" type='submit' key='botao_submit' icon={<PlayCircleIcon />}/> 
          ) : (
            <DefaultButton aria-label='Interromper Tarefa Atual' title="Interromper Tarefa Atual" type='button' color='red' key='botao_button' icon={<StopCircleIcon />} onClick={handleInterruptTask} /> 
          )}
        </div>
      </form>
  );
};