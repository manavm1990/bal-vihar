import { H3, Ol, P, Table, Ul } from "@components/ui/typography";
import { sundayBringItems, sundayGroups, sundaySteps } from "@lib/sunday-content";
import { CheckIcon } from "@radix-ui/react-icons";

export default function TypicalSunday() {
  return (
    <section className="space-y-6">
      <Ol variant="unstyled" className="divide-y rounded-lg border px-5 shadow-sm">
        {sundaySteps.map((step) => (
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

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-3 rounded-lg border p-5 shadow-sm">
          <H3>Which group is yours?</H3>
          <Table
            headers={["Group", "Sunday rhythm", "Dismissal"]}
            rows={sundayGroups.map(({ group, rhythm, dismissal }) => [group, rhythm, dismissal])}
          />
        </div>

        <div className="space-y-3 rounded-lg border p-5 shadow-sm">
          <H3>What to bring</H3>
          <Ul variant="unstyled" className="space-y-3">
            {sundayBringItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon aria-hidden="true" className="text-primary-700 mt-0.5 size-5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </Ul>
        </div>
      </div>
    </section>
  );
}
