"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLiveChat, Message } from "@/hooks/use-live-chat";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Send, Hash, Users, Zap, Ghost, ArrowDown, X, MessageSquareLock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Aesthetic: Cyber-Ghost Minimal (Navbar Variant)
 * DFII: 14
 */

export function LiveChatWidget() {
  const { user, isSignedIn } = useUser();
  const { messages, sendMessage, isConnected } = useLiveChat(user?.id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isOpen && isAtBottom) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isAtBottom, isOpen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const distanceToBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
    setIsAtBottom(distanceToBottom < 60);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("message") as HTMLInputElement;
    if (input.value.trim() && user) {
      sendMessage(input.value, {
        id: user.id,
        name: user.fullName || "Anonymous",
        image: user.imageUrl,
      });
      input.value = "";
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "glass capsule items-center gap-2 text-sm font-medium transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-primary outline-none hidden sm:flex",
          isOpen ? "bg-accent-muted text-primary" : "hover:bg-accent-muted"
        )}
      >
        <Users className="w-4 h-4" />
        Live Room
        {!isOpen && messages.length > 0 && (
          <span className="relative flex h-2 w-2 ml-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 border border-white dark:border-background"></span>
          </span>
        )}
      </button>

      {/* Mobile Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "glass capsule p-2 items-center justify-center flex sm:hidden hover:bg-accent-muted transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none",
          isOpen ? "bg-accent-muted text-primary" : "hover:bg-accent-muted text-foreground"
        )}
      >
        <Users className="w-5 h-5 relative" />
        {!isOpen && messages.length > 0 && (
           <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-background animate-pulse" />
        )}
      </button>

      {/* Popover Modal fixed to screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed top-[88px] right-4 md:right-6 w-[380px] md:w-[440px] max-w-[calc(100vw-32px)] h-[580px] md:h-[650px] max-h-[calc(100vh-120px)] flex flex-col pointer-events-auto border border-accent-muted/10 dark:border-white/5 bg-background/80 backdrop-blur-3xl rounded-3xl overflow-hidden shadow-2xl z-[100]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-accent-muted/10 dark:border-white/5 bg-background/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Hash className="w-4 h-4 text-primary" />
                  </div>
                  {isConnected && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest leading-none">Global Hub</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-tight mt-1">
                    {messages.length} Chats • {isConnected ? "Listening" : "Connecting"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-accent-muted transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scroll-smooth scrollbar-hide overscroll-contain"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-40">
                  <MessageSquareLock className="w-8 h-8 mb-2" />
                  <p className="text-xs font-mono uppercase tracking-widest text-center">No Signals Detected</p>
                </div>
              )}
              
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <MessageItem
                    key={msg.id}
                    message={msg}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Floating Scroll Down button */}
            {!isAtBottom && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={scrollToBottom}
                className="absolute bottom-24 right-5 p-2 rounded-full bg-primary text-white shadow-lg hover:scale-110 active:scale-95 transition-transform drop-shadow-md z-10"
              >
                <ArrowDown className="w-4 h-4" />
              </motion.button>
            )}

            {/* Input / Auth */}
            {isSignedIn ? (
              <form
                onSubmit={handleSendMessage}
                className="p-4 bg-background/50 border-t border-accent-muted/10 dark:border-white/5 relative z-10"
              >
                <div className="relative group flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      name="message"
                      placeholder="Send a thought..."
                      autoComplete="off"
                      className="w-full px-4 py-3 bg-muted/30 border border-accent-muted/10 focus:border-primary/30 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 text-xs font-medium pr-10"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground/30">
                      <Ghost className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="p-3 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_5px_15px_rgba(var(--primary-rgb),0.3)] shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 bg-background/50 border-t border-accent-muted/10 text-center relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Authentication Required
                </p>
                <SignInButton mode="modal">
                  <button className="px-6 py-2.5 bg-foreground text-background dark:bg-white dark:text-black rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all w-full">
                    Establish Identity
                  </button>
                </SignInButton>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageItem({ message }: { message: Message }) {
  // Extract YouTube ID
  const ytMatch = message.content.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const videoId = ytMatch ? ytMatch[1] : null;

  // Extract trusted Image / GIF URL
  const imgMatch = message.content.match(/(?:https:\/\/)(?:[a-zA-Z0-9-]+\.)*(?:imgur\.com|giphy\.com|tenor\.com|unsplash\.com|githubusercontent\.com|discordapp\.com|discordapp\.net|twimg\.com)\/[^\s]+\.(?:jpg|jpeg|png|gif|webp)(?:\?[^\s]*)?/i);
  const imageUrl = imgMatch ? imgMatch[0] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        opacity: { duration: 0.2 }
      }}
      className={cn(
        "flex gap-3 w-full",
        message.isMe ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!message.isMe && (
        <div className="relative shrink-0 mt-1">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl overflow-hidden border border-accent-muted/20 bg-muted/20">
            <Image
              src={message.userImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=Ghost"}
              alt={message.userName}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}

      <div className={cn(
        "flex flex-col gap-1.5 max-w-[85%]",
        message.isMe ? "items-end" : "items-start",
        (videoId || imageUrl) && "w-[95%] md:w-[85%]"
      )}>
        <div className="flex items-center gap-1.5 px-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{message.userName}</span>
          <span className="text-[9px] font-mono text-muted-foreground/30 italic">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className={cn(
          "relative px-4 py-3 rounded-2xl text-[13px] font-medium leading-relaxed tracking-tight break-words",
          message.isMe
            ? "bg-primary text-white rounded-tr-none shadow-md"
            : "bg-muted/40 text-foreground rounded-tl-none border border-accent-muted/5 dark:bg-white/5",
          (videoId || imageUrl) && "w-full"
        )}>
          {/* Format links loosely */}
          <span className="whitespace-pre-wrap">
            {message.content.split(/(\s+)/).map((part, i) => 
              part.match(/^https?:\/\//) ? (
                <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 opacity-90 hover:opacity-100 transition-opacity">
                  {part}
                </a>
              ) : (
                part
              )
            )}
          </span>

          {videoId && (
            <div className="mt-3 relative w-full aspect-video rounded-xl overflow-hidden bg-black/20 shadow-lg border border-white/10">
              <iframe
                title={`YouTube thumbnail ${videoId}`}
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          )}

          {imageUrl && (
            <div className="mt-3 relative w-full rounded-xl overflow-hidden shadow-lg border border-accent-muted/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Chat attachment"
                className="w-full h-auto max-h-[300px] object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
