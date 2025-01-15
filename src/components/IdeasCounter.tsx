import { Card, CardContent } from "@/components/ui/card";

interface IdeasCounterProps {
  count: number;
}

export function IdeasCounter({ count }: IdeasCounterProps) {
  const formatNumber = (num: number) => num.toString().padStart(1, "0");
  const digits = formatNumber(count).split("");

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-medium">Ideas generated</p>
      <div className="flex gap-1">
        {digits.map((digit, idx) => (
          <Card key={idx} className="bg-primary w-8 h-10 flex items-center justify-center">
            <CardContent className="text-primary-foreground p-0 text-xl font-bold">
              {digit}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}