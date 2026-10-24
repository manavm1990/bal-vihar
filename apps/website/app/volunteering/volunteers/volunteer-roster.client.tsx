"use client";

import Directory from "@components/directory.client";
import OptionPicker from "@components/option-picker.client";
import SectionNav from "@components/section-nav";
import { H3, MutedP, Ul } from "@components/ui/typography";
import type { VolunteerActivity, VolunteerRosterView } from "@lib/sanity/volunteer-roster";

interface VolunteerRosterProps {
  view: VolunteerRosterView;
}

/** An event picker and a searchable A–Z list of the volunteers. */
export default function VolunteerRoster({ view }: VolunteerRosterProps) {
  const { activities, directory } = view;
  const links = [
    ...(activities.length > 0 ? [{ href: "#by-event", title: "By event" }] : []),
    ...(directory.length > 0 ? [{ href: "#everyone", title: "Everyone, A to Z" }] : []),
  ];

  return (
    <div className="space-y-10">
      <SectionNav label="On this page" links={links} />
      {activities.length > 0 && <ActivityPicker activities={activities} />}
      {directory.length > 0 && <Directory entries={directory} />}
    </div>
  );
}

interface ActivityPickerProps {
  activities: VolunteerActivity[];
}

function ActivityPicker({ activities }: ActivityPickerProps) {
  return (
    <OptionPicker
      id="by-event"
      title="By event"
      groups={[{ legend: "Event or team", options: activities }]}
    >
      {(activity) => (
        <>
          <H3 className="text-xl">{activity.name}</H3>
          {activity.volunteers.length === 0 ? (
            <MutedP>No one is listed for this yet.</MutedP>
          ) : (
            <>
              <MutedP>
                {activity.volunteers.length}{" "}
                {activity.volunteers.length === 1 ? "volunteer" : "volunteers"}
              </MutedP>
              <Ul variant="unstyled" className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                {activity.volunteers.map((name) => (
                  <li key={name} className="min-w-0">
                    {name}
                  </li>
                ))}
              </Ul>
            </>
          )}
        </>
      )}
    </OptionPicker>
  );
}
