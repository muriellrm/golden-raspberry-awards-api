import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "#/app";

describe("[Awards] - Search Controller", () => {
  it("should be able to search all awards", async () => {
    const sut = await request(app).get("/awards");

    expect(sut.statusCode).toEqual(200);
    expect(sut.body).toHaveLength(206);
  });

  it("should be able to search all awards by year", async () => {
    const sut = await request(app).get("/awards?year=1999");

    expect(sut.statusCode).toEqual(200);
    expect(sut.body).toHaveLength(5);
    expect(sut.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          producers: "Jon Peters and Barry Sonnenfeld",
          studios: "Warner Bros.",
          title: "Wild Wild West",
          winner: true,
          year: 1999,
        }),
        expect.objectContaining({
          id: expect.any(String),
          producers: "Sidney Ganis and Jack Giarraputo",
          studios: "Columbia Pictures",
          title: "Big Daddy",
          winner: false,
          year: 1999,
        }),
        expect.objectContaining({
          id: expect.any(String),
          producers: "Robin Cowie and Gregg Hale",
          studios: "Artisan Entertainment",
          title: "The Blair Witch Project",
          winner: false,
          year: 1999,
        }),
        expect.objectContaining({
          id: expect.any(String),
          producers: "Susan Arthur, Donna Roth and Colin Wilson",
          studios: "DreamWorks",
          title: "The Haunting",
          winner: false,
          year: 1999,
        }),
        expect.objectContaining({
          id: expect.any(String),
          producers: "Rick McCallum and George Lucas",
          studios: "20th Century Fox",
          title: "Star Wars: Episode I – The Phantom Menace",
          winner: false,
          year: 1999,
        }),
      ])
    );
  });

  it("should be able to search all awards by title", async () => {
    const sut = await request(app).get(
      "/awards?title=Teenage Mutant Ninja Turtles"
    );

    expect(sut.statusCode).toEqual(200);
    expect(sut.body).toHaveLength(1);
    expect(sut.body).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        producers:
          "Michael Bay, Ian Bryce, Andrew Form, Bradley Fuller, Scott Mednick and Galen Walker",
        studios: "Paramount Pictures, Nickelodeon Movies, Platinum Dunes",
        title: "Teenage Mutant Ninja Turtles",
        winner: false,
        year: 2014,
      }),
    ]);
  });

  it("should be able to search all awards by winner", async () => {
    const sut = await request(app).get("/awards?winner=true");

    expect(sut.statusCode).toEqual(200);
    expect(sut.body).toHaveLength(42);
    expect(sut.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ])
    );
  });
});
