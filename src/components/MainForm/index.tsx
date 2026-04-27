import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import DefaultButton from "../DefaultButton";
import DefaultInput from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleTipe } from "../../utils/getNextCycleTipe";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";

export function MainForm() {
  const { state, setState } = useTaskContext();
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

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining, // Conferir
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleInterruptTask() {
      setState(prevState => {
        return {
          ...prevState,
          activeTask: null,
          secondsRemaining: 0,
          formattedSecondsRemaining: '00:00',
          tasks: prevState.tasks.map(task => {
            if (prevState.activeTask && prevState.activeTask.id === task.id) {
              return {...task, interruptDate: Date.now() };
            }
            return task;
          })
        };
      });
    }

    return (
        <form onSubmit={handleCreateNewTask} className='form' action=''>
          <div className='formRow'>
            <DefaultInput id='meuInput' type='text' labelText='Task' placeholder='Digite algo' ref={taskNameInput} disabled={!!state.activeTask} />
          </div>

          <div className='formRow'>
            <p>Lorem ipsum dolor sit amet.</p>
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