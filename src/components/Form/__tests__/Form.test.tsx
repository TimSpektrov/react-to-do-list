import '@testing-library/jest-dom'
import {fireEvent, render} from "@testing-library/react";
import {Form} from "../Form.tsx";

const renderComponent = () => {
  return render(<Form />)
}

describe('Form', () => {
  afterEach(() => {
    jest.clearAllMocks();
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
  // it('При нажатии кнопки добавить вызывается метод добавления дела', () => {
  //   const handleSubmit = jest.fn();
  //   const {getByTestId} = renderComponent();
  //   fireEvent.change(getByTestId('InputForm'), {target: {value: 'Добавляем дело'}})
  //   fireEvent.click(getByTestId('SubmitButton'))
  //   expect(handleSubmit('Добавляем дело')).toHaveBeenCalledWith('Добавляем дело')
  // });

})