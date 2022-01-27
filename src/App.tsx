import { Component, createEffect, createSignal } from 'solid-js';
import './App.scss';
import styles from './App.module.scss';
import { useRoutes } from 'solid-app-router';
import routes from './routes';
import { Icon } from './components';

const [theme, setTheme] = createSignal('light');

const App: Component = () => {
  const Routes = useRoutes(routes);

  createEffect(()=>{
    document.documentElement.className=`theme-${theme()}`
  })

  return (
    <div class={styles.root}>
      <div class={styles.sidebar}>
        <button onClick={()=>setTheme(t=> t === 'dark'? 'light' : 'dark')} class={styles.theme}>
          <Icon type={theme() === 'dark'? 'moon' : 'sun'} />
        </button>
      </div>
      <div class={styles.main}>
        <Routes />
      </div>
    </div>
  );
};

export default App;
