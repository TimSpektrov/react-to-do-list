import { createContext, ReactNode, useContext, useState } from "react";
import { ITodoContext, ITodoItem, TFilters } from "../types/todo.ts";

interface ITodoProviderProps {
  children: ReactNode;
}

const filters: TFilters[] = ['all', 'completed', 'incomplete']
export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({ children }: ITodoProviderProps) => {
  const storageTodos = localStorage.todo
  const [todos, setTodos] = useState<ITodoItem[]>(storageTodos ? JSON.parse(storageTodos) : [])
  const storageFilter = localStorage.selectedTodo as TFilters
  const [selectedFilter, setSelectedFilter] = useState<TFilters>(filters.includes(storageFilter) ? storageFilter : 'all')

  const filteredTodos = todos.filter(todo => {
    if (selectedFilter === 'completed') return todo.done;
    if (selectedFilter === 'incomplete') return !todo.done;
    return true;
  })

  const addTodo = (todo: string) => {
    const newTodos = [...todos, { text: todo, done: false, id: new Date().getTime() }]
    localStorage.todo = JSON.stringify(newTodos)
    setTodos([...newTodos]);
  };

  const toggleTodo = (id: number) => {
    const index = todos.findIndex(item => item.id === id)
      if (index !== -1) {
        const newTodos = [...todos]
        newTodos[index].done = !newTodos[index].done
        localStorage.todo = JSON.stringify(newTodos)
        setTodos([...newTodos])
      }
  }

  const removeTodo = (id: number) => {
    const newTodos = todos.filter(item => item.id !== id)
    localStorage.todo = JSON.stringify(newTodos)
    setTodos([...newTodos])
  }

  const filterTodo = (filter: TFilters) => {
    setSelectedFilter(filter)
  }
  return(
    <TodoContext.Provider value={{filteredTodos, filters, selectedFilter,  addTodo, toggleTodo, removeTodo, filterTodo }} >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = () => {
  return useContext(TodoContext)
}