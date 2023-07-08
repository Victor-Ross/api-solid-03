import { FastifyInstance } from 'fastify';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { search } from './search';
import { nearby } from './nearby';
import { create } from './create';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT);

  /** Authenticated routes */
  /**
   *  Search for gyms by query.
   * Ex: search by title
   */
  app.get('/gyms/search', search);

  /**
   *  Search for user nearby gyms.
   * Search by user latitude and user longitude
   */
  app.get('/gyms/nearby', nearby);

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create);
}
