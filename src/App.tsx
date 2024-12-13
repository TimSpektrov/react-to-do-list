import styles from './app.module.scss'
import { Form } from "./components/Form";
import { TodoProvider } from "./hooks/useTodoList.tsx";
import { List } from "./components/List";
import { Filters } from "./components/Filters";

function App() {
  return (
    <TodoProvider>
      <div className={styles.container}>
        <h2>TO-DO</h2>
        <Form />
        <List />
        <Filters />
      </div>
    </TodoProvider>
  )
}

export default App
