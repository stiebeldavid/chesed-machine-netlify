import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface IdeaCardProps {
  title: string;
  content: string;
  onNewIdea: () => void;
}

export function IdeaCard({ title, content, onNewIdea }: IdeaCardProps) {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefresh = () => {
    setIsSpinning(true);
    onNewIdea();
    setTimeout(() => setIsSpinning(false), 500);
  };

  return (
    <Card className={cn(
      "w-full bg-gradient-to-br from-[#FDE1D3] to-[#FEF7CD] border-2 border-[#FEC6A1] shadow-lg relative",
      "transform transition-all duration-500 hover:scale-105",
      isSpinning && "animate-[spin_0.5s_ease-in-out]"
    )}>
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute top-2 right-2 w-8 h-8 bg-white/50 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-colors duration-300 rounded-full"
        onClick={handleRefresh}
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-lg font-serif text-[#8B5CF6]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <p className="text-xl font-serif text-[#4B5563] min-h-[60px]">{content}</p>
      </CardContent>
    </Card>
  );
}