import { deepStrictEqual, equal } from "node:assert/strict";
import { test } from "node:test";

import { getVolunteerContactLinks } from "./volunteers-list";

test("optional contact links accept ordinary email and formatted phone values", () => {
  deepStrictEqual(getVolunteerContactLinks(" volunteer@example.org ", " +1 (314) 555-0123 "), {
    email: "volunteer@example.org",
    phone: "+1 (314) 555-0123",
  });
  deepStrictEqual(getVolunteerContactLinks(null, null), { email: null, phone: null });
  deepStrictEqual(getVolunteerContactLinks("", ""), { email: null, phone: null });
});

test("malformed contact details cannot add mail headers or unsafe phone content", () => {
  for (const email of [
    "not-an-email",
    "person@example.org?bcc=other@example.org",
    "person@example.org\r\nBcc: other@example.org",
  ])
    equal(getVolunteerContactLinks(email, null).email, null);
  for (const phone of ["javascript:alert(1)", "call me", "+(---)", "123;phone-context=example.org"])
    equal(getVolunteerContactLinks(null, phone).phone, null);
});
