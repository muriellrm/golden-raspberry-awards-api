import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";

import { app } from "#/app";
import { createAwardsList } from "#/utils/test/create-awards-list";

describe("[Awards] - Intervals Controller", () => {
  beforeEach(async () => {});

  it("should be able to get awards interval", async () => {
    await createAwardsList(app);
    const sut = await request(app).get("/awards/intervals");

    expect(sut.statusCode).toEqual(200);
    expect(sut.body).toEqual(
      expect.objectContaining({
        min: expect.arrayContaining([
          expect.objectContaining({
            producer: "Producer 01",
            interval: 3,
            previousWin: 1999,
            followingWin: 2002,
          }),
        ]),
        max: expect.arrayContaining([
          expect.objectContaining({
            producer: "Producer 05",
            interval: 11,
            previousWin: 2012,
            followingWin: 2023,
          }),
          expect.objectContaining({
            producer: "Producer 01",
            interval: 23,
            previousWin: 2002,
            followingWin: 2025,
          }),
        ]),
      })
    );
  });
});
