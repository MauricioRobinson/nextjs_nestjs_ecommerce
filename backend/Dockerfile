FROM node:20-alpine as base

ENV DIR /app
WORKDIR $DIR


FROM base as dev

ENV NODE_ENV=development

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8000

# Copy source files into application directory
# COPY --chown=app:app . /app

# Updates prisma types
RUN npx prisma generate

#Starts the server un dev mode
CMD [ "npm", "run", "start:dev" ]
