
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ChatMessageList = ({
  className,
  children,
  ...props
}: ChatMessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div
      ref={scrollRef}
      className={cn("flex flex-col p-4 space-y-3 overflow-y-auto", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { ChatMessageList };
