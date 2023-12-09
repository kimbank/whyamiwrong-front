import { NextApiRequest, NextApiResponse } from "next";
import { sign } from "@/lib/jwt";

export async function POST(req, res) {
  const data = await req.json();
  const { user_id, password } = data;

  const token = sign(user_id);

  let _res = new Response(JSON.stringify({ user_id, token }));
  _res.headers.set(
    "Set-Cookie",
    `_TOKEN=${token}; Path=/; Expires=${(
      new Date(Date.now() + 60 * 60 * 24 * 30)
    ).toUTCString()}; HttpOnly;`
  );

  return _res;
}

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 회원 확인 후 회원 jwt를 반환합니다.
 *     tags : [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "whyamiwrong"
 *               password:
 *                 type: string
 *                 example: "qwer1234"
 *     responses:
 *       200:
 *         description: 'success'
 */
