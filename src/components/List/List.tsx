import { FC } from "react";
import { useTodo } from "../../hooks/useTodo.tsx";
import styles from './list.module.scss'
import cn from "classnames";
import {ITodoItem} from "../../types/todo.ts";

export const List: FC = () => {
  const { filteredTodos, toggleTodo, removeTodo } = useTodo()
  return (
    <ul className={styles.list}>
      {filteredTodos.map((item: ITodoItem) => (
        <li key={item.id}>
          <span className={cn(styles.item, {[styles['done']]: item.done})} onClick={() => toggleTodo(item.id)}>{item.text}</span>
          <button className={styles.remove} aria-label={'remove'} onClick={() => removeTodo(item.id)}></button>
        </li>
      ))}
    </ul>
  );
};
