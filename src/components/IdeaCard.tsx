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
      "w-full bg-gradient-to-br from-[#FDE1D3] to-[#FEF7CD] border-2 border-[#FEC6A1] shadow-lg",
      "transform transition-all duration-500 hover:scale-105",
      isSpinning && "animate-[spin_0.5s_ease-in-out]"
    )}>
      <CardHeader>
        <CardTitle className="text-xl font-serif text-[#8B5CF6]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-serif mb-4 text-[#4B5563] min-h-[80px]">{content}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/50 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-colors duration-300"
          onClick={handleRefresh}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          New idea
        </Button>
      </CardContent>
    </Card>
  );
}