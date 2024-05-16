import { useState } from 'react';
import styles from './auth.module.css'

const AuthPage = () => {
  const [page, setPage] = useState('login');
  
  const handleChangeMode = (mode: any) => {
    setPage(mode);
  }

  return (
    <>
      { page === 'login' ? <>
        <div className={`${styles.container}`}>
          <h1>Авторизация</h1>
          <div className={`${styles.inputGroup}`}>
            <input placeholder='логин' />
            <input placeholder='пароль' />
          </div>
          <div className={`${styles.btnGroup}`}> 
            <button>Войти</button>
            <button onClick={() => handleChangeMode('register')}>Зарегистрироваться</button>
          </div>
        </div>
      </> : <>
        <div className={`${styles.container}`}>
          <h1>Регистрация</h1>
          <div className={`${styles.inputGroup}`}>
            <input placeholder='логин' />
            <input placeholder='пароль' />
          </div>
          <div className={`${styles.btnGroup}`}>
            <button>Зарегистрироваться</button>
            <button onClick={() => handleChangeMode('login')}>Перейти ко входу</button>
          </div>
        </div>
      </>}
    </>
  )
}

export default AuthPage;