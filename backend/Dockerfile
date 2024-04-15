FROM node:20-alpine

# RUN useradd -ms /bin/sh -u 1001 app
# USER app

# Install dependencies
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

# Copy source files into application directory
# COPY --chown=app:app . /app

# Updates prisma types
RUN npx prisma generate

#Starts the server un dev mode
CMD [ "npm", "run", "start:dev" ]