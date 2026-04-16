import { PlayCircleIcon } from "lucide-react";
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

    return (
        <form onSubmit={handleCreateNewTask} className='form' action=''>
          <div className='formRow'>
            <DefaultInput id='meuInput' type='text' labelText='Task' placeholder='Digite algo' ref={taskNameInput} />
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
            <DefaultButton icon={<PlayCircleIcon />}/> 
          </div>
        </form>
    );
};