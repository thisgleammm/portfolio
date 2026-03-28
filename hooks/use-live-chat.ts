"use client";

import { useState, useEffect, useCallback } from "react";

export interface Message {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  timestamp: Date;
  isMe: boolean;
}

export function useLiveChat(currentUserId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Fallback to determine if a message is from the current user
  const mapMessage = useCallback((msg: { id: string; userId: string; userName: string; userImage: string; content: string; timestamp: string | Date }): Message => {
    return {
      id: msg.id,
      userId: msg.userId,
      userName: msg.userName,
      userImage: msg.userImage,
      content: msg.content,
      timestamp: new Date(msg.timestamp),
      isMe: msg.userId === currentUserId,
    };
  }, [currentUserId]);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/chat', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data.map(mapMessage));
        setIsConnected(true);
      }
    } catch (err) {
      console.error('Failed to fetch chat history:', err);
      setIsConnected(false);
    }
  }, [mapMessage]);

  useEffect(() => {
    fetchMessages();
    // Short polling: every 3 seconds fetch the latest chat history
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const sendMessage = useCallback(async (content: string, user: { id: string; name: string; image: string }) => {
    // Send to the API
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userName: user.name,
          userImage: user.image,
          content,
        }),
      });
      const data = await res.json();
      
      // Optimistic upate (or just wait for the next poll)
      const newMessage = mapMessage(data);
      setMessages((prev) => [...prev, newMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  }, [mapMessage]);

  return { messages, sendMessage, isConnected };
}
