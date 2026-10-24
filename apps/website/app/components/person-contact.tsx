import type { DirectoryPerson } from "@lib/sanity/directory";

interface PersonContactProps {
  person: Pick<DirectoryPerson, "email" | "name" | "phone"> & { isBackup?: boolean };
}

/** A person's name with a backup badge and whichever public contact links they have. */
export default function PersonContact({ person }: PersonContactProps) {
  return (
    <div className="min-w-0 space-y-0.5">
      <p className="font-semibold">
        {person.name}
        {person.isBackup && (
          <span className="bg-muted text-muted-foreground ml-2 rounded px-2 py-0.5 text-xs font-normal">
            Backup
          </span>
        )}
      </p>
      {person.email && (
        <a className="block w-fit max-w-full text-sm break-all" href={`mailto:${person.email}`}>
          {person.email}
        </a>
      )}
      {person.phone && (
        <a className="block w-fit text-sm" href={`tel:${toDialable(person.phone)}`}>
          {person.phone}
        </a>
      )}
    </div>
  );
}

const toDialable = (phone: string) => phone.replace(/[ ()-]/g, "");
