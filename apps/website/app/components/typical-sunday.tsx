import { H3, Ol, P } from "@components/ui/typography";
import { SUNDAY_STEPS } from "@lib/constants";

export default function TypicalSunday() {
  return (
    <Ol variant="unstyled" className="divide-y rounded-lg border px-5 shadow-sm">
      {SUNDAY_STEPS.map((step) => (
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
  );
}
