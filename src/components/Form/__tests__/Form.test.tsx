import '@testing-library/jest-dom'
import {fireEvent, render} from "@testing-library/react";
import {Form} from "../Form.tsx";

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
  it('При нажатии кнопки добавить вызывается метод добавления дела', () => {
    const { getByTestId } = renderComponent();
    const input = getByTestId('InputForm') as HTMLInputElement;
    const button = getByTestId('SubmitButton') as HTMLButtonElement;
    fireEvent.change(input, {target: {value: 'Добавляем дело'}})
    expect(input.value).toBe('Добавляем дело')
    fireEvent.click(button)
    expect(input.value).toBe('');
  });
})