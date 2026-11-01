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
    detail: "Drop off at the side entrance of the Hindu Temple Community Center.",
  },
  {
    time: "10:00 a.m.",
    title: "Assembly",
    detail:
      "Groups K–3 start with Aarti in their classrooms. Groups 4–7 gather for assembly in the hall and stage areas.",
  },
  {
    time: "About an hour",
    title: "Classroom instruction",
    detail: "Culture, religion, history and geography, with art projects that follow the lessons.",
  },
  {
    time: "About an hour",
    title: "Yoga and bhajan",
    detail:
      "Half an hour of each. Groups K–3 have class first, then yoga and bhajan. Groups 4–7 do it the other way around.",
  },
  {
    time: "12:20 or 12:30 p.m.",
    title: "Dismissal",
    detail: "Groups K–3 finish at 12:20 p.m. and groups 4–7 at 12:30 p.m.",
  },
] as const;

interface TypicalSundayProps {
  title?: string;
  steps?: readonly TypicalSundayStep[];
  className?: string;
}

export function TypicalSunday({
  title,
  steps = typicalSundaySteps,
  className,
}: TypicalSundayProps) {
  return (
    <section className={cn("space-y-4 lg:col-start-1", className)}>
      {title ? (
        <h2 className="text-secondary text-3xl font-semibold tracking-tight">{title}</h2>
      ) : null}
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
