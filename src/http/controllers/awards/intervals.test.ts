import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "#/app";

describe("[Awards] - Intervals Controller", () => {
  it("should be able to get awards interval", async () => {
    const sut = await request(app).get("/awards/intervals");

    expect(sut.statusCode).toEqual(200);
    expect(sut.body).toEqual(
      expect.objectContaining({
        min: expect.arrayContaining([
          expect.objectContaining({
            producer: "Joel Silver",
            interval: 1,
            previousWin: 1990,
            followingWin: 1991,
          }),
        ]),
        max: expect.arrayContaining([
          expect.objectContaining({
            producer: "Matthew Vaughn",
            interval: 13,
            previousWin: 2002,
            followingWin: 2015,
          }),
        ]),
      })
    );
  });
});
