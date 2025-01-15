import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

interface IdeaCardProps {
  title: string;
  content: string;
  onNewIdea: () => void;
}

export function IdeaCard({ title, content, onNewIdea }: IdeaCardProps) {
  return (
    <Card className="w-full bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-xl font-serif">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-serif mb-4">{content}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-transparent border-white text-white hover:bg-white/20"
          onClick={onNewIdea}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          New idea
        </Button>
      </CardContent>
    </Card>
  );
}