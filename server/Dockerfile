FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn run build

# remove development dependencies
RUN npm prune --production

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/index"]