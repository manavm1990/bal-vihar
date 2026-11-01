import { H3, Ol, P } from "@components/ui/typography";
import { cn } from "@lib/utils";

export interface TypicalSundayStep {
  time: string;
  title: string;
  detail: string;
}

export const typicalSundaySteps: readonly TypicalSundayStep[] = [
  {
    time: "9:45 a.m.",
    title: "Doors open",
    detail: "Families arrive and settle in as class starts to come together.",
  },
  {
    time: "10:00 a.m.",
    title: "Assembly",
    detail: "Students begin with a shared welcome, prayer and a quick overview of the day.",
  },
  {
    time: "About an hour",
    title: "Classroom learning",
    detail:
      "Students move through culture, history, geography, values and projects in guided class time.",
  },
  {
    time: "About an hour",
    title: "Yoga & bhajan",
    detail: "The group shifts into mindful movement, music and celebration before dismissal.",
  },
  {
    time: "12:20–12:30 p.m.",
    title: "Dismissal",
    detail: "Classes wrap up and families head out, with pickup details posted for each group.",
  },
] as const;

interface TypicalSundayProps {
  title?: string;
  steps?: readonly TypicalSundayStep[];
  className?: string;
}

export function TypicalSunday({
  title = "A typical Sunday",
  steps = typicalSundaySteps,
  className,
}: TypicalSundayProps) {
  return (
    <section className={cn("space-y-4 lg:col-start-1", className)}>
      <h2 className="text-secondary text-3xl font-semibold tracking-tight">{title}</h2>
      <Ol
        variant="unstyled"
        className="max-w-3xl divide-y rounded-lg border bg-white px-5 shadow-sm"
      >
        {steps.map((step) => (
          <li
            key={step.title}
            className="grid gap-1 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
          >
            <p className="text-primary-ink text-sm font-semibold sm:pt-1">{step.time}</p>
            <div className="space-y-1">
              <H3 className="text-xl">{step.title}</H3>
              <P>{step.detail}</P>
            </div>
          </li>
        ))}
      </Ol>
    </section>
  );
}
