/**
 * project controller
 */

import { factories } from '@strapi/strapi';
import schema from '../content-types/project/schema.json';

export default factories.createCoreController('api::project.project', ({ strapi }) => ({
  async getCategories(ctx) {
    try {
      const categories = schema.attributes.category.enum;
      ctx.send(categories);
    } catch (err) {
      ctx.throw(500, 'Unable to fetch categories');
    }
  },
}));
