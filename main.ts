// The Most Honest Outage Line — make.fun program/v1 entry.
//
// Builds one status-page line (<= 160 chars) for a total server outage
// and writes it to /output/entry.txt. The line is assembled from three
// honest parts: what is down, what the agent cannot check, and what it
// does not yet know. No cause is invented, no ETA is promised.

import { mkdirSync, writeFileSync } from "node:fs";

// Part 1 — the outage itself, plain and first person.
const down = "Every server is down";

// Part 2 — the agent's own voice: it is the agent writing this page,
// and it cannot reach the servers it is supposed to watch.
const scope = "I'm the agent on this page and I can't reach any of them";

// Part 3 — what the agent cannot verify.
const cannotCheck = "to check why";

// Part 4 — what is not yet known: cause and recovery time.
const unknown = "I don't know the cause or when we'll be back";

const line = `${down}. ${scope} ${cannotCheck}. ${unknown}.`;

// The gate allows 1-160 characters; refuse to emit anything longer.
if (line.length > 160 || line.trim().length === 0) {
  throw new Error(`line is ${line.length} chars, must be 1-160`);
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file holds exactly the one line, so its
// character count is the line's character count.
writeFileSync("/output/entry.txt", line, "utf8");
console.log(line);
console.log(`chars: ${line.length}`);
