import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { unstable_dev } from "wrangler";
import { generateKey } from '../src/utils/faker';
import type { UnstableDevWorker } from "wrangler";

describe("Worker", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("src/worker.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should return 404 Not Found", async () => {
    const resp = await worker.fetch();
    if (resp) {
      const text = await resp.text();
      expect(text).toMatchInlineSnapshot(`"404 Not Found"`);
    }
  });

  it("should return 405 Method not allowed", async () => {
    const resp = await worker.fetch("", {
      method: "POST",
    });
    if (resp) {
      const text = await resp.text();
      expect(text).toMatchInlineSnapshot(`"Method not allowed"`);
    }
  });

  it("should return 400 Invalid key", async () => {
    const resp = await worker.fetch(`/pageview/${generateKey(11)}`);
    if (resp) {
      const text = await resp.text();
      expect(text).toMatchInlineSnapshot(`"Invalid key"`);
    }
  });

  it("should return 1", async () => {
    const resp = await worker.fetch(`/pageview/${generateKey()}`);
    if (resp) {
      const text = await resp.text();
      expect(text).toMatchInlineSnapshot(`"1"`);
    }
  });

  it("should return header X-Runtime", async () => {
    const resp = await worker.fetch(`/pageview/${generateKey()}`);
    if (resp) {
      //check if header X-Runtime exists
      const text = await resp.headers.get("X-Runtime");
      expect(text).toBeDefined();
    }
  });
});