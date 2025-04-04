
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received";
  children: React.ReactNode;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  variant = "received",
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      "flex w-max max-w-[80%] items-start gap-2 py-1.5 rounded-lg",
      variant === "sent" ? "ml-auto" : "mr-auto",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

interface ChatBubbleAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback?: string;
}

const ChatBubbleAvatar: React.FC<ChatBubbleAvatarProps> = ({
  src,
  fallback,
  className,
  ...props
}) => (
  <Avatar className={cn("size-8", className)} {...props}>
    {src && <AvatarImage src={src} />}
    <AvatarFallback>{fallback}</AvatarFallback>
  </Avatar>
);

interface ChatBubbleMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received";
  isLoading?: boolean;
}

const ChatBubbleMessage: React.FC<ChatBubbleMessageProps> = ({
  variant = "received",
  isLoading = false,
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      "rounded-lg px-3 py-2 text-sm min-w-10",
      variant === "sent"
        ? "bg-primary text-primary-foreground"
        : "bg-muted/70 text-foreground",
      className,
    )}
    {...props}
  >
    {isLoading ? (
      <div className="flex items-center justify-center gap-1.5 py-2">
        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
        <div
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
          style={{ animationDelay: "200ms" }}
        />
        <div
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
          style={{ animationDelay: "400ms" }}
        />
      </div>
    ) : (
      children
    )}
  </div>
);

export { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage };
