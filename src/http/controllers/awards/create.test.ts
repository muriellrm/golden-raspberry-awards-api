import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "#/app";
import type { AwardInputRequest } from "#/repositories/awards-repository";

describe("[Awards] - Create Controller", () => {  
  it("should be able to create an award", async () => {
    const newAward: AwardInputRequest = {
      producers: `Producer 01`,
      studios: `Studio 01`,
      title: `Movie 01`,
      winner: true,
      year: 1999,
    }
      
    const sut = await request(app)
    .post("/awards")
    .send(newAward);

    expect(sut.statusCode).toEqual(201);
    expect(sut.body.id).toEqual(expect.any(String));
    expect(sut.body.title).toEqual(newAward.title);
    expect(sut.body.producers).toEqual(newAward.producers);
    expect(sut.body.studios).toEqual(newAward.studios);
    expect(sut.body.winner).toEqual(newAward.winner);
    expect(sut.body.year).toEqual(newAward.year);    
  });
});
