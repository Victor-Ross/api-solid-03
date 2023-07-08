import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { refresh } from './refresh';

export async function usersRoutes(app: FastifyInstance) {
  /** Unauthenticated routes  */
  /** Create new user  */
  app.post('/users', register);

  /** Log in user  */
  app.post('/sessions', authenticate);

  /** Refresh token  */
  app.patch('/token/refresh', refresh);

  /** Authenticated routes  */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
