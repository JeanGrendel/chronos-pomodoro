import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useState } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
    const [theme, setTheme] = useState<AvailableThemes>('dark');

    function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault(); //Não segue o link do href
        console.log('Clicado', Date.now());

        setTheme(prevTheme => {
            const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
            return newTheme;
        })

        //document.documentElement.setAttribute('data-theme', theme);
    }

    return <nav className={styles.menu}>
        <a href="#" className={styles.menuLink} aria-label='Ir para a Home' title='Ir para a Home'>
            <HouseIcon />
        </a>

        <a href="#" className={styles.menuLink} aria-label='Ver Histórico' title='Ver Histórico'>
            <HistoryIcon />
        </a>

        <a href="#" className={styles.menuLink} aria-label='Configurações' title='Configurações'>
            <SettingsIcon />
        </a>

        <a href="#" className={styles.menuLink} aria-label='Mudar Tema' title='Mudar Tema' onClick={handleThemeChange}>
            <SunIcon />
        </a>
    </nav>
};