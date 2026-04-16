import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleTipe } from '../../utils/getNextCycleTipe';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle});

  const cycleDescriptionMap = {
    workTime: 'Tempo de foco',
    shortBreakTime: 'Pausa curta',
    longBreakTime: 'Pausa longa',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos</span>

      <div className={styles.cyclesDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleTipe(nextCycle);
          return (
            <span 
            key={`${nextCycleType}_${nextCycle}`}
            className={`${styles.cyclesDot} ${styles[nextCycleType]}`}
            aria-label={`Indicador de ${cycleDescriptionMap[nextCycleType]}`}
            title={`Indicador de ${cycleDescriptionMap[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}