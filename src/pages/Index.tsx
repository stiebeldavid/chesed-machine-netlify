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
  const [isAnimating, setIsAnimating] = useState(true);

  const generateNewAction = () => {
    return actions[Math.floor(Math.random() * actions.length)];
  };

  const generateNewRecipient = () => {
    return recipients[Math.floor(Math.random() * recipients.length)];
  };

  const generateNewTime = () => {
    return times[Math.floor(Math.random() * times.length)];
  };

  const generateNewIdea = () => {
    setCurrentIdea({
      action: generateNewAction(),
      recipient: generateNewRecipient(),
      time: generateNewTime(),
    });
    setIdeasCount(prev => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Stop after ~2 bounces
  };

  const handleNewAction = () => {
    setCurrentIdea(prev => ({
      ...prev,
      action: generateNewAction(),
    }));
    setIdeasCount(prev => prev + 1);
  };

  const handleNewRecipient = () => {
    setCurrentIdea(prev => ({
      ...prev,
      recipient: generateNewRecipient(),
    }));
    setIdeasCount(prev => prev + 1);
  };

  const handleNewTime = () => {
    setCurrentIdea(prev => ({
      ...prev,
      time: generateNewTime(),
    }));
    setIdeasCount(prev => prev + 1);
  };

  useEffect(() => {
    generateNewIdea();
    // Stop initial animation after 1 second
    setTimeout(() => setIsAnimating(false), 1000);
  }, []);

  const fullIdeaText = `${currentIdea.action} ${currentIdea.recipient} ${currentIdea.time}`;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 gap-8 bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB]">
      <div className="w-full max-w-2xl flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-[#8B5CF6] text-center font-serif">The Chesed Machine</h1>
        
        <p className="text-center text-lg text-[#4B5563]">
          Tap the button below to generate a unique chesed idea just for you!
        </p>

        <Button 
          size="lg" 
          className={`bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 rounded-full px-8 py-6 font-semibold text-lg ${isAnimating ? 'animate-bounce' : ''}`}
          onClick={generateNewIdea}
        >
          ✨ Generate Ideas ✨
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <IdeaCard
            title="Do what:"
            content={currentIdea.action}
            onNewIdea={handleNewAction}
          />
          <IdeaCard
            title="For whom:"
            content={currentIdea.recipient}
            onNewIdea={handleNewRecipient}
          />
          <IdeaCard
            title="When:"
            content={currentIdea.time}
            onNewIdea={handleNewTime}
          />
        </div>

        <Button 
          size="lg"
          variant="outline" 
          className="bg-white border-2 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-full px-8 py-6 font-semibold text-lg animate-pulse"
          onClick={() => setShareOpen(true)}
        >
          🎯 Yes! I'll Do This One! 🎯
        </Button>

        <IdeasCounter count={ideasCount} />

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