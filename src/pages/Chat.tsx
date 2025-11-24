import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, LogOut, GraduationCap, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm IntelliAssist, your AI assistant for IITM Janakpuri College. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate("/auth");
  };

  const simulateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("admission") || lowerMessage.includes("enroll")) {
      return "For admissions, please visit the college office or check our website. The admission process typically starts in May. You'll need your 12th-grade marksheet and other documents. Would you like more specific information?";
    } else if (lowerMessage.includes("fee") || lowerMessage.includes("cost")) {
      return "The fee structure varies by course. For B.Tech programs, the annual fee is approximately ₹1,20,000. For detailed information about fees for specific courses, please contact the accounts department or visit the official website.";
    } else if (lowerMessage.includes("course") || lowerMessage.includes("program")) {
      return "IITM Janakpuri offers various programs including B.Tech in Computer Science, Electronics, Mechanical Engineering, and more. We also offer MBA and MCA programs. Which course are you interested in?";
    } else if (lowerMessage.includes("placement") || lowerMessage.includes("job")) {
      return "Our placement cell works year-round to connect students with top companies. Recent placement statistics show 85% placement rate with average packages ranging from 4-8 LPA. Companies like TCS, Infosys, and Wipro regularly recruit from our campus.";
    } else if (lowerMessage.includes("faculty") || lowerMessage.includes("professor")) {
      return "Our faculty members are highly qualified with PhDs and extensive industry experience. Each department has dedicated faculty who focus on both theoretical knowledge and practical skills development.";
    } else if (lowerMessage.includes("library") || lowerMessage.includes("book")) {
      return "The college library is open Monday to Saturday, 9 AM to 6 PM. We have over 50,000 books, journals, and digital resources. Students can borrow up to 5 books at a time for 15 days.";
    } else if (lowerMessage.includes("hostel") || lowerMessage.includes("accommodation")) {
      return "Yes, we have separate hostel facilities for boys and girls with modern amenities including Wi-Fi, mess facilities, and 24/7 security. Hostel fees are separate from tuition fees. Would you like to know more about hostel admission?";
    } else {
      return "I'd be happy to help! I can assist you with information about admissions, courses, fees, placements, faculty, library, hostels, and more. What would you like to know specifically?";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking and response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                IntelliAssist
              </h1>
              <p className="text-xs text-muted-foreground">IITM Janakpuri</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="hover:bg-destructive hover:text-destructive-foreground transition-all"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
        <Card className="flex-1 flex flex-col shadow-2xl border-border/50 bg-card/95 backdrop-blur-sm overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-fade-in ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Avatar className={`w-10 h-10 ${message.sender === "bot" ? "bg-gradient-primary" : "bg-gradient-secondary"}`}>
                  <AvatarFallback className="text-white">
                    {message.sender === "bot" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-lg ${
                    message.sender === "user"
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-card border border-border"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <span className={`text-xs mt-1 block ${message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <Avatar className="w-10 h-10 bg-gradient-primary">
                  <AvatarFallback className="text-white">
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 bg-muted/30 p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about IITM Janakpuri..."
                className="flex-1 bg-background border-border focus:ring-2 focus:ring-primary transition-all"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                size="icon"
                className="bg-gradient-primary hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-secondary" />
              Powered by AI - responses may vary
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
