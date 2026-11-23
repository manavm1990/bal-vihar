import { API_VERSION } from "@bv/schemas/constants";
import { Select } from "@sanity/ui";
import { use } from "react";
import { type ObjectInputProps, type SanityClient, set, unset, useClient } from "sanity";

type Member = { id: string; name: string };

const BATCH_SIZE = 100;

let loading: Promise<Member[]> | undefined;

export default function MemberInput(props: ObjectInputProps) {
  const members = use(loadMembers(useClient({ apiVersion: API_VERSION })));
  const id = typeof props.value?.["id"] === "string" ? props.value["id"] : "";
  const storedName = typeof props.value?.["name"] === "string" ? props.value["name"] : id;
  const isMissing = id !== "" && !members.some((member) => member.id === id);

  return (
    <Select
      onChange={(event) => {
        const member = members.find(({ id: memberId }) => memberId === event.currentTarget.value);
        props.onChange(member ? set({ id: member.id, name: member.name }) : unset());
      }}
      readOnly={props.readOnly}
      value={id}
    >
      <option value="">Pick a person…</option>
      {isMissing ? <option value={id}>{storedName} (no longer in the project)</option> : null}
      {members.map((member) => (
        <option key={member.id} value={member.id}>
          {member.name}
        </option>
      ))}
    </Select>
  );
}

async function fetchMembers(client: SanityClient) {
  const { projectId } = client.config();
  const access = await client.request<{ isRobot?: boolean; projectUserId?: string }[]>({
    url: `/projects/${projectId}/acl/`,
  });
  const ids = access.flatMap(({ isRobot, projectUserId }) =>
    !isRobot && projectUserId ? [projectUserId] : [],
  );
  const batches = Array.from({ length: Math.ceil(ids.length / BATCH_SIZE) }, (_, index) =>
    ids.slice(index * BATCH_SIZE, (index + 1) * BATCH_SIZE),
  );
  const users = await Promise.all(
    batches.map((batch) =>
      client.request<{ displayName?: string; id: string } | { displayName?: string; id: string }[]>(
        { url: `/projects/${projectId}/users/${batch.join(",")}` },
      ),
    ),
  );

  return users
    .flat()
    .map(({ displayName, id }) => ({ id, name: displayName || id }))
    .sort((first, second) => first.name.localeCompare(second.name));
}

function loadMembers(client: SanityClient) {
  loading ??= fetchMembers(client).catch((error: unknown) => {
    console.error("Could not load the project's members", error);
    return [];
  });

  return loading;
}
