import { FormEvent, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

import styles from './main.module.css';

let _socket: Socket;

const MainPage = () => {
  const [socket, setSocket] = useState(_socket);
  const [messages, setMessages] = useState<{text: string, isMine: boolean}[]>([]);
  const [currentChatRoom, setCurrentChatRoom] = useState<string>("NONE");
  const [messageInputValue, setMessageInputValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChangeValue = (text: string) => { setMessageInputValue(text) }

  const handleMessage = async (e: FormEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(messageInputValue !== undefined && messageInputValue.split(" ").join("") !== '') {
      await _socket.emit('messageToServer', { room: currentChatRoom, text: messageInputValue })
      setMessageInputValue('');
    }
    //setMessages((prev) => [...prev, {text: messageInputValue, isMine: true}])
    inputRef.current?.focus()
  };

  useEffect(() => {
    const connect = async () => {
      _socket = io(`${process.env.REACT_APP_BASE_URL}user`);
    }
    connect();
    _socket.on('connect', () => {
      console.log('connected')
    })
    return () => {
      _socket.disconnect();
    };
  }, [])

  useEffect(() => {
    setMessages([]);
  }, [currentChatRoom])

  useEffect(() => {
    _socket.on('messageToServer', async (e) => {
      if(e.client === _socket.id) setMessages((prev) => [...prev, {text: e.message, isMine: true}])
      else setMessages((prev) => [...prev, {text: e.message, isMine: false}]) 
    });
    return () => {
      if(_socket) {
        _socket.off('messageToServer');
      }
    }
  }, [_socket]);

  useEffect(() => {
    _socket.emit('joinChat', currentChatRoom)
    return () => {
        _socket.emit("leaveChat", currentChatRoom)
    };
  }, [_socket, currentChatRoom])

  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.sidebar}`}>
          <div>Юзеры</div>
        </div>
        <div className={`${styles.chatWrapper}`}>
          {currentChatRoom === '1' ? <>
            <div>Выберите комнату</div>
          </> : <>
              <div>
                {messages.map((item) => (
                  <>
                    <div>{item.text}</div>
                  </>
                ))}
              </div>
              <form className={`${styles.inputWrapper}`}>
                <div className="flex gap-4">
                  <input 
                    ref={inputRef}
                    value={messageInputValue}
                    onChange={(e) => handleChangeValue(e.target.value)}
                    placeholder='Напишите сообщение...'
                    autoFocus
                  />
                  <button
                    onClick={handleMessage}
                    type='submit'
                  >
                    Отправить
                  </button> 
                </div>
              </form>
          </>}
        </div>
      </div>
    </>
  )
}

export default MainPage;