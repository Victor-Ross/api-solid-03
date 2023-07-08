import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' });
    }
  };
}
