import { Button } from "@/components/ui/button";
import { GraduationCap, Bot, Sparkles, MessageCircle, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered Assistance",
      description: "Get instant answers to all your college-related queries using advanced AI technology.",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "24/7 Availability",
      description: "Access information anytime, anywhere. No waiting for office hours.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your conversations are encrypted and your data is always protected.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Get instant responses to your questions in seconds, not hours.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_50%)]" />
      
      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium animate-fade-in border border-secondary/20">
            <Sparkles className="w-4 h-4" />
            IITM Janakpuri Official AI Assistant
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-up">
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              IntelliAssist
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Your intelligent companion for all college queries. Get instant answers about admissions, courses, placements, and more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 transition-all shadow-xl hover:shadow-2xl text-lg px-8 py-6"
              onClick={() => navigate("/auth")}
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 hover:bg-secondary/10 hover:border-secondary transition-all"
              onClick={() => navigate("/auth")}
            >
              Learn More
            </Button>
          </div>

          {/* Hero Image/Icon */}
          <div className="relative w-full max-w-3xl mx-auto mt-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-3xl border border-border/50 shadow-2xl p-8 md:p-12">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-secondary rounded-2xl rotate-12 animate-pulse-glow" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-primary rounded-full animate-bounce-subtle" />
              
              <div className="relative flex items-center justify-center gap-8">
                <div className="w-32 h-32 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-2xl">
                  <GraduationCap className="w-16 h-16 text-primary-foreground" />
                </div>
                <div className="hidden md:flex flex-col gap-3">
                  <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-3 animate-fade-in">
                    <Bot className="w-6 h-6 text-secondary" />
                    <span className="text-sm font-medium">AI-Powered Responses</span>
                  </div>
                  <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <MessageCircle className="w-6 h-6 text-secondary" />
                    <span className="text-sm font-medium">Real-time Chat</span>
                  </div>
                  <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <Sparkles className="w-6 h-6 text-secondary" />
                    <span className="text-sm font-medium">Smart Search</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Why Choose IntelliAssist?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center text-primary-foreground mb-4 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6 bg-gradient-primary rounded-3xl p-12 shadow-2xl animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-foreground/90">
            Join hundreds of students already using IntelliAssist for their college queries.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 transition-all shadow-xl text-lg px-8 py-6"
            onClick={() => navigate("/auth")}
          >
            Start Chatting Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
