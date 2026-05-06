import { describe, it, expect } from "vitest";
import {
  parsePost,
  auditCluster,
} from "./audit-cluster-links.mjs";

describe("parsePost", () => {
  it("extracts frontmatter and body", () => {
    const raw = `---
title: Hello
cornerstone: true
spokeOf:
draft: false
---

Body text here with [link](/writing/x).`;
    const result = parsePost("hello.mdx", raw);
    expect(result.slug).toBe("hello");
    expect(result.frontmatter.title).toBe("Hello");
    expect(result.frontmatter.cornerstone).toBe(true);
    expect(result.body).toContain("Body text here");
    expect(result.linkedSlugs).toContain("x");
  });

  it("collects only /writing/<slug> links", () => {
    const raw = `---
title: T
draft: false
---

[a](/writing/foo) [b](https://google.com) [c](/about)`;
    const result = parsePost("t.mdx", raw);
    expect(result.linkedSlugs).toEqual(["foo"]);
  });
});

describe("auditCluster", () => {
  it("passes when no cornerstone exists yet (pre-launch)", () => {
    const posts = [];
    const result = auditCluster(posts);
    expect(result.errors).toEqual([]);
  });

  it("passes when cornerstone is the only post", () => {
    const posts = [
      {
        slug: "playbook",
        frontmatter: { cornerstone: true, draft: false, spokeOf: undefined },
        linkedSlugs: [],
      },
    ];
    const result = auditCluster(posts);
    expect(result.errors).toEqual([]);
  });

  it("fails when a spoke does not link to its cornerstone", () => {
    const posts = [
      {
        slug: "playbook",
        frontmatter: { cornerstone: true, draft: false, spokeOf: undefined },
        linkedSlugs: ["spoke-1"],
      },
      {
        slug: "spoke-1",
        frontmatter: { cornerstone: false, draft: false, spokeOf: "playbook" },
        linkedSlugs: [],
      },
    ];
    const result = auditCluster(posts);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toMatch(/spoke-1.*does not link.*playbook/i);
  });

  it("fails when cornerstone does not link to a spoke", () => {
    const posts = [
      {
        slug: "playbook",
        frontmatter: { cornerstone: true, draft: false, spokeOf: undefined },
        linkedSlugs: [],
      },
      {
        slug: "spoke-1",
        frontmatter: { cornerstone: false, draft: false, spokeOf: "playbook" },
        linkedSlugs: ["playbook"],
      },
    ];
    const result = auditCluster(posts);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toMatch(/cornerstone.*does not link.*spoke-1/i);
  });

  it("warns (does not fail) when a spoke has fewer than 2 sibling links", () => {
    const posts = [
      {
        slug: "playbook",
        frontmatter: { cornerstone: true, draft: false, spokeOf: undefined },
        linkedSlugs: ["spoke-1", "spoke-2", "spoke-3"],
      },
      {
        slug: "spoke-1",
        frontmatter: { cornerstone: false, draft: false, spokeOf: "playbook" },
        linkedSlugs: ["playbook"],
      },
      {
        slug: "spoke-2",
        frontmatter: { cornerstone: false, draft: false, spokeOf: "playbook" },
        linkedSlugs: ["playbook", "spoke-1", "spoke-3"],
      },
      {
        slug: "spoke-3",
        frontmatter: { cornerstone: false, draft: false, spokeOf: "playbook" },
        linkedSlugs: ["playbook", "spoke-1", "spoke-2"],
      },
    ];
    const result = auditCluster(posts);
    expect(result.errors).toEqual([]);
    expect(result.warnings.some((w) => /spoke-1.*siblings/i.test(w))).toBe(true);
  });

  it("ignores draft posts", () => {
    const posts = [
      {
        slug: "playbook",
        frontmatter: { cornerstone: true, draft: false, spokeOf: undefined },
        linkedSlugs: [],
      },
      {
        slug: "spoke-draft",
        frontmatter: { cornerstone: false, draft: true, spokeOf: "playbook" },
        linkedSlugs: [],
      },
    ];
    const result = auditCluster(posts);
    expect(result.errors).toEqual([]);
  });
});
