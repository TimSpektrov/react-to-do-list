import {act, renderHook} from "@testing-library/react";
import {TodoProvider, useTodo} from "../useTodo.tsx";
import {TFilters} from "../../types/todo.ts";

describe('useTodo', () => {
  const initialTodos = [
    { text: 'Задача 1', done: false, id: 1 },
    { text: 'Задача 2', done: true, id: 2 },
    { text: 'Задача 3', done: true, id: 3 },
    { text: 'Задача 4', done: false, id: 4 },
  ];
  beforeEach(() => {
    localStorage.clear();
  });
  it('добавление первого элемента', () => {
    const { result } = renderHook(() => useTodo(), {
      wrapper: TodoProvider,
    });
    act(() => {
      result.current.addTodo('дело')
    })
    expect(result.current._todos).toEqual([{ text: 'дело', done: false, id: expect.any(Number) }])
  });
  it('добавление нового элемента', () => {
    localStorage.setItem('todo', JSON.stringify(initialTodos));
    const { result } = renderHook(() => useTodo(), {
      wrapper: TodoProvider,
    });
    act(() => {
      result.current.addTodo('дело')
    })
    expect(result.current._todos).toEqual([...initialTodos,{ text: 'дело', done: false, id: expect.any(Number) }])
  });
  it('проверка тоггла элемента', () => {
    const resultTodos = [
      { text: 'Задача 1', done: false, id: 1 },
      { text: 'Задача 2', done: false, id: 2 },
      { text: 'Задача 3', done: true, id: 3 },
      { text: 'Задача 4', done: false, id: 4 },
    ];
    localStorage.setItem('todo', JSON.stringify(initialTodos));
    const { result } = renderHook(() => useTodo(), {
      wrapper: TodoProvider,
    });
    act(() => {
      result.current.toggleTodo(2)
    })
    expect(result.current._todos).toEqual(resultTodos)
  });
  it('проверка двойного тоггла элемента', () => {
    localStorage.setItem('todo', JSON.stringify(initialTodos));
    const { result } = renderHook(() => useTodo(), {
      wrapper: TodoProvider,
    });
    act(() => {
      result.current.toggleTodo(2)
      result.current.toggleTodo(2)
    })
    expect(result.current._todos).toEqual(initialTodos)
  });
  it('удаление элемента', () => {
    const resultTodos = [
      { text: 'Задача 1', done: false, id: 1 },
      { text: 'Задача 3', done: true, id: 3 },
      { text: 'Задача 4', done: false, id: 4 },
    ];
    localStorage.setItem('todo', JSON.stringify(initialTodos));
    const { result } = renderHook(() => useTodo(), {
      wrapper: TodoProvider,
    });
    act(() => {
      result.current.removeTodo(2)
    })
    expect(result.current._todos).toEqual(resultTodos)
  });
  it('удаление несуществующего элемента', () => {
    localStorage.setItem('todo', JSON.stringify(initialTodos));
    const { result } = renderHook(() => useTodo(), {
      wrapper: TodoProvider,
    });
    act(() => {
      result.current.removeTodo(5)
    })
    expect(result.current._todos).toEqual(initialTodos)
  });
  it('фильтрация всех элемента', () => {
    localStorage.setItem('todo', JSON.stringify(initialTodos));
    const { result } = renderHook(() => useTodo(), {
      wrapper: TodoProvider,
    });
    act(() => {
      result.current.filterTodo('all')
    })
    expect(result.current.filteredTodos).toEqual(initialTodos)
  });
  it('фильтрация выполненных задач', () => {
    const resultTodos = [
      { text: 'Задача 2', done: true, id: 2 },
      { text: 'Задача 3', done: true, id: 3 },
    ];
    localStorage.setItem('todo', JSON.stringify(initialTodos));
    const { result } = renderHook(() => useTodo(), {
      wrapper: TodoProvider,
    });
    act(() => {
      result.current.filterTodo('completed')
    })
    expect(result.current.filteredTodos).toEqual(resultTodos)
  });
  it('фильтрация невыполненных задач', () => {
    const resultTodos = [
      { text: 'Задача 1', done: false, id: 1 },
      { text: 'Задача 4', done: false, id: 4 },
    ];
    localStorage.setItem('todo', JSON.stringify(initialTodos));
    const { result } = renderHook(() => useTodo(), {
      wrapper: TodoProvider,
    });
    act(() => {
      result.current.filterTodo('incomplete')
    })
    expect(result.current.filteredTodos).toEqual(resultTodos)
  });
  it('фильтрация по некорректному ключу должна возвращать все элементы', () => {
    localStorage.setItem('todo', JSON.stringify(initialTodos));
    const { result } = renderHook(() => useTodo(), {
      wrapper: TodoProvider,
    });
    act(() => {
      result.current.filterTodo('incorrect' as TFilters)
    })
    expect(result.current.filteredTodos).toEqual(initialTodos)
  });
})