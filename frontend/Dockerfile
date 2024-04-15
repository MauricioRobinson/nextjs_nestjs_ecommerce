FROM node:20-alpine

# RUN useradd -ms /bin/sh -u 1001 app
# USER app

# Install dependencies
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

# Copy source files into application directory
# COPY --chown=app:app . /app
CMD [ "npm", "run", "dev" ]