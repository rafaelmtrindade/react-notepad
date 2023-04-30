FROM node:16-alpine AS base
USER node
WORKDIR /app
COPY ./backend/package*.json ./

FROM base AS development
COPY ./backend .
COPY .*rc ../
COPY .*ignore ../
VOLUME /app
CMD ["sh", "-c", "npm i && npm run dev"]

FROM base AS build
RUN npm ci
COPY ./backend .
RUN npm test --passWithNoTests && npm run build

FROM base AS production
RUN npm ci --only=production
COPY --from=build /app/dist /app/dist
CMD ["npm", "start"]