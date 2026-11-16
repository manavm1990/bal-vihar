import { H3 } from "./ui/typography";

interface CalloutProps {
  title: string;
  children: React.ReactNode;
}

export default function Callout({ title, children }: CalloutProps) {
  return (
    <div className="bg-primary-50 border-primary-300 space-y-3 rounded-lg border-2 p-5">
      <H3 className="text-xl">{title}</H3>
      {children}
    </div>
  );
}
