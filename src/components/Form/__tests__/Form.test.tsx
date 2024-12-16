import '@testing-library/jest-dom'
import {fireEvent, render, waitFor} from "@testing-library/react";
import {Form} from "../Form.tsx";
import {TodoProvider} from "../../../hooks/useTodo.tsx";

const renderComponent = () => {
  return render(<Form />)
}

describe('Form', () => {
  const addTodoMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    addTodoMock.mockClear();
  })

  it('Кнопка disabled при пустом значении', () => {
    const {getByTestId} = renderComponent();
    fireEvent.change(getByTestId('InputForm'), {target: {value: ''}})
    expect(getByTestId('SubmitButton')).toBeDisabled()
  });
  it('Кнопка enabled при не пустом значении', async () => {
    const {getByTestId} = renderComponent();
    fireEvent.change(getByTestId('InputForm'), {target: {value: '42'}})
    expect(getByTestId('SubmitButton')).not.toBeDisabled()
  });
  it('После добавления дела инпут обнуляется', () => {
    const { getByTestId } = renderComponent();
    const input = getByTestId('InputForm') as HTMLInputElement;
    const button = getByTestId('SubmitButton') as HTMLButtonElement;
    fireEvent.change(input, {target: {value: 'Добавляем дело'}})
    expect(input.value).toBe('Добавляем дело')
    fireEvent.click(button)
    expect(input.value).toBe('');
  });
  it('появление ошибки при пустом поле', async () => {
    const { getByTestId, queryByTestId } = renderComponent();
    const input = getByTestId('InputForm') as HTMLInputElement;
    const button = getByTestId('SubmitButton') as HTMLButtonElement;
    let errorMessage = queryByTestId('ErrorMessage')
    expect(errorMessage).toBeNull()

    fireEvent.change(input, {target: {value: ' '}})
    fireEvent.click(button)

    await waitFor(() => {
      errorMessage = queryByTestId('ErrorMessage');
      expect(errorMessage).toBeInTheDocument();
    })
    expect(input.value).toBe('');
    expect(button).toBeDisabled();
  });
  it('При сабмите вызывается метод handleClick', async () => {
    localStorage.setItem('todo', JSON.stringify([]));
    const { getByTestId } = render(
      <TodoProvider>
        <Form />
      </TodoProvider>
    );

    const input = getByTestId('InputForm') as HTMLInputElement;
    const button = getByTestId('SubmitButton') as HTMLButtonElement;
    fireEvent.change(input, {target: {value: 'дело'}})
    fireEvent.click(button)
    await waitFor(() => {
      const todos = JSON.parse(localStorage.getItem('todo') || '[]');
      expect(todos.length).toBe(1);
      expect(todos[0]).toEqual({ text: 'дело', done: false, id: expect.any(Number) });
    })
  });
})