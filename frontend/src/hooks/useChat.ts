import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useMemo, useState } from "react";
import { io, Socket } from "Socket.IO-client";
import { SERVER_URI } from "../constants";
import { Message, MessageWhereUniqueInput, MessageCreateInput, UserInfo } from "../types";

// экземпляр сокета
let socket: Socket;

export const useChat = () => {
  const token = localStorage.getItem("token")!;
  const userInfo = jwtDecode<UserInfo>(token);
  const { uid, userName } = userInfo;

  // это важно: один пользователь - один сокет
  if (!socket) {
    socket = io(SERVER_URI, {
      // помните сигнатуру объекта `handshake` на сервере?
      query: {
        userName: userInfo.userName
      }
    });
  }

  const [messages, setMessages] = useState<Message[]>();
  const [log, setLog] = useState<string>();

  useEffect(() => {
    // подключение/отключение пользователя
    socket.on("log", (log: string) => {
      setLog(log);
    });

    // получение сообщений
    socket.on("messages", (messages: Message[]) => {
      setMessages(messages);
    });

    socket.emit("messages:get");
  }, []);

  // отправка сообщения
  const send = useCallback((payload: MessageCreateInput) => {
    socket.emit("message:post", payload);
  }, []);

  // удаление сообщения
  const remove = useCallback((payload: MessageWhereUniqueInput) => {
    socket.emit("message:delete", payload);
  }, []);

  // операции
  const chatActions = useMemo(
    () => ({
      send,
      remove
    }),
    []
  );

  return { messages, log, chatActions };
};