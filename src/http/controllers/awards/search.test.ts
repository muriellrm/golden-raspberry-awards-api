import request from "supertest";
import { describe, expect, it, beforeEach, afterEach } from "vitest";

import { app } from "#/app";
import { createAwardsList } from "#/utils/test/create-awards-list";
import type { Award } from "#/models/award";
import { prisma } from "#/lib/prisma";

let awards: Award[];
describe("[Awards] - Search Controller", () => {
  beforeEach(async () => {
    awards = await createAwardsList(app);
  });

  afterEach(async () => {
    await prisma.award.deleteMany({});
  });

  it("should be able to search all awards", async () => {
    const sut = await request(app).get("/awards");

    expect(sut.statusCode).toEqual(200);
    expect(sut.body).toHaveLength(6);
    expect(sut.body).toEqual(expect.arrayContaining(awards));
  });

  it("should be able to search all awards by year", async () => {
    const sut = await request(app).get("/awards?year=1999");

    expect(sut.statusCode).toEqual(200);
    expect(sut.body).toHaveLength(1);
    expect(sut.body).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        producers: "Producer 01",
        studios: "Studio 01",
        title: "Movie 01",
        winner: true,
        year: 1999,
      }),
    ]);
  });

  it("should be able to search all awards by title", async () => {
    const sut = await request(app).get("/awards?title=Movie 11");

    expect(sut.statusCode).toEqual(200);
    expect(sut.body).toHaveLength(1);
    expect(sut.body).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        producers: "Producer 04",
        studios: "Studio 25",
        title: "Movie 11",
        winner: false,
        year: 2024,
      }),
    ]);
  });

  it("should be able to search all awards by winner", async () => {
    const sut = await request(app).get("/awards?winner=false");

    expect(sut.statusCode).toEqual(200);
    expect(sut.body).toHaveLength(1);
    expect(sut.body).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        producers: "Producer 04",
        studios: "Studio 25",
        title: "Movie 11",
        winner: false,
        year: 2024,
      }),
    ]);
  });
});
