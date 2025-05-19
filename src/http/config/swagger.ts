import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Golden Raspberry Awards API",
    version: "1.0.0",
    description: "Lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.",
  },  
};

export const swaggerConfig = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./src/http/controllers/**/*.ts"]
});
