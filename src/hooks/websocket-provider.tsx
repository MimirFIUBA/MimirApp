'use client'; // Es necesario porque este código depende de Web APIs como WebSocket

import { useToast } from "@/components/ui/use-toast";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface WebSocketMessage {
  type: "update" | "alert" | "notification";
  payload: any;
}

interface WebSocketContextType {
  messages: WebSocketMessage[];
  isConnected: boolean;
  sendMessage: (message: any) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ url: string; children: React.ReactNode }> = ({ url, children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast()

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        if (data.type === "alert") {
            toast({
                variant: "destructive",
                title: "Alerta!",
                description: data.payload.message,
            })
        }
        setMessages((prev) => [...prev, data]);
      } catch (err) {
        console.error("Failed to parse message:", err);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message: any) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    }
  };

  return (
    <WebSocketContext.Provider value={{ messages, isConnected, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};