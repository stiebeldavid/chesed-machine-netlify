import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Facebook, Copy, MessageCircle, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ideaText: string;
}

export function ShareModal({ open, onOpenChange, ideaText }: ShareModalProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ideaText);
      toast({
        title: "Copied to clipboard",
        description: "You can now paste the idea anywhere!",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const shareToSocial = (platform: string) => {
    const text = encodeURIComponent(ideaText);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${text}`,
    };
    
    if (platform in urls) {
      window.open(urls[platform as keyof typeof urls], "_blank");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>I want to do this one!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p className="text-lg">{ideaText}</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="outline" onClick={() => shareToSocial("facebook")}>
              <Facebook className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" onClick={() => shareToSocial("twitter")}>
              <Twitter className="mr-2 h-4 w-4" />
              Tweet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}