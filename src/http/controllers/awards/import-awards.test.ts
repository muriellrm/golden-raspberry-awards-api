import request from "supertest";
import { describe, expect, it } from "vitest";
import path from "path";

import { app } from "#/app";
import { prisma, uploadDest } from "#/lib/prisma";

describe("[Awards] - Import Awards Controller", () => {
  it("deve importar um arquivo CSV com sucesso e validar os dados", async () => {
    const rootPath = process.cwd();
    const csvFilePath = path.join(
      rootPath,
      ".internals",
      "fixtures",
      "import-awards-test.csv"
    );
  
    const response = await request(app)
      .post("/awards/import")
      .attach("file", csvFilePath)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty(
      "message",
      "Importação concluída com sucesso"
    );

    const awardsInDb = await prisma.award.findMany();
    expect(awardsInDb).toHaveLength(4);
    expect(awardsInDb).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          year: 2020,
          title: "Movie A",
          studios: "Studio A",
          producers: "Producer A",
          winner: true,
        }),
        expect.objectContaining({
          id: expect.any(String),
          year: 2019,
          title: "Movie B",
          studios: "Studio B",
          producers: "Producer B",
          winner: false,
        }),
        expect.objectContaining({
          id: expect.any(String),
          year: 2018,
          title: "Movie C",
          studios: "Studio C",
          producers: "Producer C",
          winner: true,
        }),
        expect.objectContaining({
          id: expect.any(String),
          year: 2017,
          title: "Movie D",
          studios: "Studio D",
          producers: "Producer D",
          winner: false,
        }),
      ])
    );
  });

  it("deve retornar erro 400 se não enviar arquivo", async () => {
    const response = await request(app)
      .post("/awards/import")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toHaveProperty("error", "Arquivo CSV é obrigatório");
  });
});
