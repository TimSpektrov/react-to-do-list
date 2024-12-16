export interface ITodoItem {
  id: number;
  text: string;
  done: boolean;
}

export type TFilters = 'all' | 'completed' | 'incomplete'

export interface ITodoContext {
  filteredTodos: ITodoItem[];
  _todos: ITodoItem[];
  filters: TFilters[];
  selectedFilter: TFilters;
  addTodo: (todo: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  filterTodo: (filter: TFilters) => void;
}