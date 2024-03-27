FROM node:lts-alpine3.19

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
CMD [ "npm", "run", "dev" ]