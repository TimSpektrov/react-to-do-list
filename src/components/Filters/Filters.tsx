import {FC} from "react";
import styles from './filters.module.scss'
import {useTodo} from "../../hooks/useTodo.tsx";
import cn from 'classnames'
export const Filters: FC = () => {
  const { filters, filterTodo, selectedFilter } = useTodo()
  return (
    <div className={styles.list}>
      {filters.map(item => (
        <button className={cn(styles.item, {[styles['selected']]: (item === selectedFilter)})} key={item} onClick={() => filterTodo(item)}>{item}</button>
      ))}
    </div>
  )
}