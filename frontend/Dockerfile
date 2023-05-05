FROM node:16-alpine AS base
USER node
WORKDIR /app
COPY ./frontend/package*.json ./
COPY ./frontend .

FROM base AS development
COPY .*rc ../
COPY .*ignore ../
VOLUME /app
CMD ["sh", "-c", "npm i && npm start"]

FROM base AS build
RUN rm .eslintrc; \
    npm ci && \
    npm run build

FROM nginx:1.21.1-alpine AS production
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
