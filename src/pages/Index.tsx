import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IdeaCard } from "@/components/IdeaCard";
import { ShareModal } from "@/components/ShareModal";
import { IdeasCounter } from "@/components/IdeasCounter";

// Temporary data arrays until we integrate with Google Sheets
const actions = [
  "Deliver hot chocolate to",
  "Write a thank you note to",
  "Buy coffee for",
  "Give a compliment to",
  "Share your lunch with",
];

const recipients = [
  "someone you feel impatient with",
  "a neighbor",
  "someone who seems lonely",
  "a friend you haven't spoken to in a while",
  "someone who helped you recently",
];

const times = [
  "during lunch",
  "this weekend",
  "today",
  "this afternoon",
  "when you have a free moment",
];

const Index = () => {
  const [currentIdea, setCurrentIdea] = useState({
    action: "",
    recipient: "",
    time: "",
  });
  const [ideasCount, setIdeasCount] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);

  const generateNewIdea = () => {
    const newIdea = {
      action: actions[Math.floor(Math.random() * actions.length)],
      recipient: recipients[Math.floor(Math.random() * recipients.length)],
      time: times[Math.floor(Math.random() * times.length)],
    };
    setCurrentIdea(newIdea);
    setIdeasCount(prev => prev + 1);
  };

  useEffect(() => {
    generateNewIdea();
  }, []);

  const fullIdeaText = `${currentIdea.action} ${currentIdea.recipient} ${currentIdea.time}`;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 gap-8">
      <div className="w-full max-w-2xl flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-primary text-center">The Chesed Machine</h1>
        
        <p className="text-center text-lg">
          Tap the button below to generate a unique chesed idea just for you!
        </p>

        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90"
          onClick={generateNewIdea}
        >
          Generate Ideas
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <IdeaCard
            title="Do what:"
            content={currentIdea.action}
            onNewIdea={generateNewIdea}
          />
          <IdeaCard
            title="For whom:"
            content={currentIdea.recipient}
            onNewIdea={generateNewIdea}
          />
          <IdeaCard
            title="When:"
            content={currentIdea.time}
            onNewIdea={generateNewIdea}
          />
        </div>

        <IdeasCounter count={ideasCount} />

        <Button 
          variant="outline" 
          className="border-primary text-primary hover:bg-primary hover:text-white"
          onClick={() => setShareOpen(true)}
        >
          I want to do this one!
        </Button>

        <ShareModal
          open={shareOpen}
          onOpenChange={setShareOpen}
          ideaText={fullIdeaText}
        />
      </div>
    </div>
  );
};

export default Index;