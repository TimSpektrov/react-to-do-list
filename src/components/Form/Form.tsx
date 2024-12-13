import {ChangeEvent, FC, FormEvent, useState} from 'react';
import styles from './form.module.scss';
import {useTodo} from "../../hooks/useTodoList.tsx";
interface IFormProps {}

export const Form: FC<IFormProps> = (props) => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [disabled, setDisabled] = useState<boolean>(true)

  const { addTodo } = useTodo()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, ' ')
    setError(null)
    setValue(value)
    setDisabled(!value)
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
    const newValue = value.trim()
    if (!newValue) {
      setDisabled(true)
      return setError('Обязательно для заполнения')
    }
    addTodo(value)
    setDisabled(true)
    setValue('')
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <span className={styles['error-message']}>{error}</span>
      <input className={styles.input} type='text' value={value} onChange={handleChange}/>
      <button className={styles.submit} type='submit' disabled={disabled}>Добавить</button>
    </form>
  );
};

