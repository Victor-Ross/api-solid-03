import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized.' });
  }
}
