import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useMemo, useState } from "react";
import { io, Socket } from "Socket.IO-client";
import { SERVER_URI } from "../constants";
import { Prisma, Message } from "../../../node_modules/@prisma/client"
import { UserInfo } from "../types";

// экземпляр сокета
let socket: Socket;

export const useChat = () => {
  const token = localStorage.getItem("token")!;
  const userInfo = jwtDecode<UserInfo>(token);
  const { uid, email } = userInfo;
  console.log(userInfo);

  // это важно: один пользователь - один сокет
  if (!socket) {
    socket = io(SERVER_URI, {
      query: {
        email: email
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
  const send = useCallback((payload: Prisma.MessageCreateInput) => {
    socket.emit("message:post", payload);
  }, []);

  // удаление сообщения
  const remove = useCallback((payload: Prisma.MessageWhereUniqueInput) => {
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