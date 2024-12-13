import { FC } from "react";
import { useTodo } from "../../hooks/useTodoList.tsx";
import styles from './list.module.scss'
import cn from "classnames";

interface IListProps {}
export const List: FC<IListProps> = () => {
  const { filteredTodos, toggleTodo, removeTodo } = useTodo()
  return (
    <ul className={styles.list}>
      {filteredTodos.map(item => (
        <li key={item.id}>
          <span className={cn(styles.item, {[styles['done']]: item.done})} onClick={() => toggleTodo(item.id)}>{item.text}</span>
          <button className={styles.remove} aria-label={'remove'} onClick={() => removeTodo(item.id)}></button>
        </li>
      ))}
    </ul>
  );
};
