import { Card } from "./ui/card";
import { H3, P } from "./ui/typography";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

export default function InfoCard({ title, children }: InfoCardProps) {
  return (
    <Card className="space-y-2 p-5">
      <H3 className="text-xl">{title}</H3>
      {typeof children === "string" ? <P>{children}</P> : children}
    </Card>
  );
}
