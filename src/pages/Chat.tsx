import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, LogOut, GraduationCap } from "lucide-react";
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
      content:
        "Hello! I'm IntelliAssist, your AI assistant for IITM Janakpuri College. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [context, setContext] = useState<string | null>(null);

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

  const followUps = (topic: string) => {
    switch (topic) {
      case "admission":
        return "\n\nWould you like details about eligibility, documents, dates, or registration process?";
      case "courses":
        return "\n\nDo you want the syllabus, fees, duration, or career scope?";
      case "placements":
        return "\n\nDo you want company lists, average packages, or training info?";
      case "events":
        return "\n\nWant to know about Impulse, Technovation, or cultural fests?";
      case "hostel":
        return "\n\nShould I tell you about fees, facilities, or room allocation?";
      default:
        return "";
    }
  };

  const simulateBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    // greetings
    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hello! How can I assist you about IITM Janakpuri today?";
    }

    if (msg.includes("how are you")) {
      return "I'm doing great! What can I help you with about IITM?";
    }

    // admissions
    if (msg.includes("admission")) {
      setContext("admission");
      return (
        "Admissions at IITM Janakpuri are conducted through GGSIPU (IPU) counselling. " +
        "You must apply via the IPU portal. Required documents include 12th marksheet, ID proof, photos and category certificates." +
        followUps("admission")
      );
    }

    // fees
    if (msg.includes("fee")) {
      return (
        "Fee structure varies by course:\n" +
        "• BCA: ~₹1,50,000 per year\n" +
        "• BBA: ~₹1,45,000 per year\n" +
        "• BJMC: ~₹1,40,000 per year\n" +
        "• MBA/MCA: ~₹1,80,000 per year\n\n" +
        "If you want official details, ask: 'Show me the official website'."
      );
    }

    // courses
    if (
      msg.includes("course") ||
      msg.includes("bca") ||
      msg.includes("bba") ||
      msg.includes("bjmc") ||
      msg.includes("mca") ||
      msg.includes("mba")
    ) {
      setContext("courses");
      return (
        "IITM Janakpuri offers:\n• BCA\n• BBA\n• BJMC\n• B.Com (Hons)\n• MCA\n• MBA\n\n" +
        "Which course do you want details about?" +
        followUps("courses")
      );
    }

    // placements
    if (msg.includes("placement") || msg.includes("package")) {
      setContext("placements");
      return (
        "IITM has strong placement records with companies like TCS, Infosys, Deloitte, KPMG, EY.\n" +
        "Average package: 4–8 LPA\nHighest package: Up to 12–14 LPA\nPlacement rate: ~85–90%\n" +
        followUps("placements")
      );
    }

    // faculty
    if (msg.includes("faculty") || msg.includes("teacher")) {
      return "The faculty is experienced, supportive and strong in both practical and academic knowledge.";
    }

    // library
    if (msg.includes("library")) {
      return "Library hours: 9 AM – 6 PM (Mon–Sat). Includes 50,000+ books, journals, digital study materials & reading hall.";
    }

    // hostel
    if (msg.includes("hostel") || msg.includes("accommodation")) {
      setContext("hostel");
      return (
        "IITM offers separate hostels for boys & girls with WiFi, mess, 24x7 security, laundry & study rooms." +
        followUps("hostel")
      );
    }

    // events
    if (msg.includes("event") || msg.includes("fest") || msg.includes("cultural")) {
      setContext("events");
      return (
        "IITM hosts multiple events like:\n• Impulse (Annual Fest)\n• TechnoVision\n• Hackathons\n• Cultural Week\n• Sports Fest\n" +
        followUps("events")
      );
    }

    // exams
    if (msg.includes("exam") || msg.includes("result")) {
      return "Exam results and notices are published on the GGSIPU official portal. Ask if you want the link.";
    }

    // contact
    if (msg.includes("contact") || msg.includes("phone") || msg.includes("email") || msg.includes("official website")) {
      return (
        "Here are the official contacts:\n" +
        "Phone: 011-28520890\n" +
        "Email: info@iitmjp.ac.in\n" +
        "Official Website: <a href='https://iitmjp.ac.in/' target='_blank' class='text-primary underline'>iitmjp.ac.in</a>"
      );
    }

    // location
    if (msg.includes("location") || msg.includes("address")) {
      return "IITM Janakpuri is located at D-29, Institutional Area, Janakpuri, New Delhi – 110058.";
    }

    return (
      "I can help you with admissions, fees, courses, events, hostels, placements and more. " +
      "Please ask something specific about IITM Janakpuri."
    );
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
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
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
        <Card className="flex-1 flex flex-col shadow-2xl border-border/50 bg-card/95 backdrop-blur-sm overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  msg.sender === "user" ? "justify-end" : ""
                }`}
              >
                {msg.sender === "bot" && (
                  <Avatar className="shadow-md">
                    <AvatarFallback>
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`p-3 rounded-xl max-w-[75%] text-sm shadow-md ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-muted-foreground rounded-bl-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />

                {msg.sender === "user" && (
                  <Avatar className="shadow-md">
                    <AvatarFallback>
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Bot className="w-4 h-4 animate-pulse" />
                <span className="animate-pulse">Assistant is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border/50 p-4 bg-card/60 backdrop-blur-md flex items-center gap-3">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSend} className="shadow-md">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
