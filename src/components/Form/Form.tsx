import {ChangeEvent, FC, FormEvent, useState} from 'react';
import styles from './form.module.scss';
import {useTodo} from "../../hooks/useTodo.tsx";

export const Form: FC = () => {
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
    if (newValue) {
      addTodo(value)
      setValue('')
    } else {
      setValue(newValue)
      setError('Обязательно для заполнения')
    }
    setDisabled(true)
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <span className={styles['error-message']} data-testid={'ErrorMessage'}>{error}</span>}
      <input className={styles.input} type='text' data-testid={'InputForm'} value={value} onChange={handleChange} placeholder={'Новое дело'}/>
      <button className={styles.submit} type='submit' data-testid={'SubmitButton'} disabled={disabled}>Добавить</button>
    </form>
  );
};

