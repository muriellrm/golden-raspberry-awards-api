import { uploadDest } from "#/lib/prisma";
import { Router } from "express";
import multer from "multer";
import { create } from "./create";
import { importAwards } from "./import-awards";
import { intervals } from "./intervals";
import { search } from "./search";


const upload = multer({ dest: uploadDest });
export const awardsRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ProducerInterval:
 *       type: object
 *       properties:
 *         producer:
 *           type: string
 *           example: ""
 *         interval:
 *           type: integer
 *           example: 0
 *         previousWin:
 *           type: integer
 *           example: 0
 *         followingWin:
 *           type: integer
 *           example: 0
 *
 * /awards/intervals:
 *   get:
 *     summary: Listar intervalos de prêmios dos produtores
 *     tags: [Awards]
 *     responses:
 *       200:
 *         description: Lista de intervalos (mínimos e máximos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 min:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProducerInterval'
 *                 max:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProducerInterval'
 */
awardsRoutes.post("/awards/import", upload.single("file"), importAwards);

/**
 * @swagger
 * /awards/import:
 *   post:
 *     summary: Importação em massa de novas indicações ao prêmio de pior filme
 *     tags: [Awards]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Dados importados com sucesso
 */
awardsRoutes.get("/awards/intervals", intervals);

/**
* @swagger
* /awards:
*   get:
*     summary: Lista de indicados ao prêmio de pior filme
*     tags: [Awards]
*     responses:
*       200:
*         description: Lista de prêmios
*     parameters:
*       - in: query
*         name: title
*         schema:
*           type: string
*         required: false
*         description: Título do prêmio para busca
*       - in: query
*         name: year
*         schema:
*           type: integer
*         required: false
*         description: Ano do prêmio para busca
*       - in: query
*         name: winner
*         schema:
*           type: boolean
*         required: false
*         description: Filtra por vencedor (true ou false)
*
*   post:
*     summary: Cria nova indicação ao prêmio de pior filme
*     tags: [Awards]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - year
*               - title
*               - studios
*               - producers
*               - winner
*             properties:
*               year:
*                 type: integer
*                 minimum: 1000
*                 maximum: 9999
*                 description: Ano do prêmio (4 dígitos)
*               title:
*                 type: string
*                 description: Título do prêmio
*               studios:
*                 type: string
*                 description: Estúdios envolvidos
*               producers:
*                 type: string
*                 description: Produtores envolvidos
*               winner:
*                 type: boolean
*                 description: Indicador se é vencedor
*     responses:
*       201:
*         description: Prêmio criado com sucesso
*/
awardsRoutes.get("/awards", search);
awardsRoutes.post("/awards", create);
