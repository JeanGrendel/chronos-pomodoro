import { Heading } from './components/Heading';
import './styles/theme.css';
import './styles/global.css';
import { TimerIcon } from 'lucide-react';

export function App () {
  return (
  <>
    <Heading>
      Olá Mundo! 
      <button>
        <TimerIcon />
        </button>
      </Heading>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Deleniti, laborum tempora. Voluptatibus minus dolor in 
      quibusdam ipsum. Corrupti, veniam minima? Nulla sapiente 
      repellendus officia deserunt laudantium animi similique a
      liquam libero.
    </p>
  </>
  );
};