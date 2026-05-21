import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { Home } from './pages/Home';


import './styles/global.css';
import './styles/theme.css';
import { MessagesContaniner } from './components/MessagesContainer';

export function App() {
  return (
    <TaskContextProvider>
      <MessagesContaniner>
        <Home />
      </MessagesContaniner>
    </TaskContextProvider>
  );
};