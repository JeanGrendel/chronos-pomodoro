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

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleTipe(nextCycle);

  function handleCreateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) return;
    
    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Nome da tarefa é parâmetro obrigatório.');
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

    const worker = new Worker(new URL('../../workers/TimeWorker.js', import.meta.url));

    worker.postMessage('FAVOR');
    worker.postMessage('FALA_OI');
    worker.postMessage('BLABLA');
    worker.postMessage('FECHAR');

    worker.onmessage = function (event) {
      console.log('PRINCIPAL Recebeu: ', event.data);
    };
  }

  function handleInterruptTask() {
    dispatch({type: TaskActionTypes.INTERRUPT_TASK})
  }

  return (
      <form onSubmit={handleCreateNewTask} className='form' action=''>
        <div className='formRow'>
          <DefaultInput id='meuInput' type='text' labelText='Task' placeholder='Digite algo' ref={taskNameInput} disabled={!!state.activeTask} />
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