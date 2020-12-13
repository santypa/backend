'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async ve(ctx) {
        const user = ctx.state.user

        let categorias = await strapi.services.categorias.find({
            user: user.id,
        });
        return categorias;
    },

    async create(ctx) {
        let entity;
        const user = ctx.state.user;

        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            data.user = user.id;

            entity = await strapi.services.categorias.create(
                data, {
                    files,
                });
        } else {
            const data = ctx.request.body;
            data.user = user.id;
            entity = await strapi.services.categorias.create(data);
        }

        return sanitizeEntity(entity, {
            model: strapi.models.categorias
        });
    },


};
