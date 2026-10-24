import { deepStrictEqual, equal } from "node:assert/strict";
import { test } from "node:test";

import { createPageDocuments } from "./crawl-pages";

const PAGE = { path: "/new-families", title: "New families", section: "Education" };

const HTML = `<html><body><header>Site header</header><main id="main-content">
<article><h1>New Families</h1><p>Everything you need before your <b>first</b> Sunday.</p>
<script>self.__next_f.push([1,"noise"])</script>
<section id="arrival"><h2 id="arrival-heading" class="x">Arrival and pick-up</h2>
<p>Use the side entrance from 9:45 a.m.<!-- --> Don&#x27;t be late &amp; wait in the lobby.</p>
<div><h3>Drop-off</h3><p>Park nearby.</p></div></section>
<section><h2>Ways to give</h2><ul><li>Check</li><li>Stock</li></ul></section>
</article></main><footer>Site footer</footer></body></html>`;

test("the page is split at each h2, and the intro keeps the page title", () => {
  const docs = createPageDocuments(PAGE, HTML);

  deepStrictEqual(
    docs.map(({ title }) => title),
    ["New families", "Arrival and pick-up", "Ways to give"],
  );
});

test("a heading id becomes the link anchor, and a heading without one links to the page", () => {
  const docs = createPageDocuments(PAGE, HTML);

  deepStrictEqual(
    docs.map(({ href }) => href),
    ["/new-families", "/new-families#arrival", "/new-families"],
  );
});

test("text drops scripts, tags and comments, and decodes entities", () => {
  const [intro, arrival, give] = createPageDocuments(PAGE, HTML);

  equal(intro?.text, "New Families Everything you need before your first Sunday.");
  equal(
    arrival?.text,
    "Use the side entrance from 9:45 a.m. Don't be late & wait in the lobby. Drop-off Park nearby.",
  );
  equal(give?.text, "Check Stock");
});

test("the site header and footer outside main are left out", () => {
  const all = createPageDocuments(PAGE, HTML)
    .map(({ text }) => text)
    .join(" ");

  equal(all.includes("Site header") || all.includes("Site footer"), false);
});

test("a page with no usable text gives no documents", () => {
  deepStrictEqual(createPageDocuments(PAGE, "<main></main>"), []);
});
