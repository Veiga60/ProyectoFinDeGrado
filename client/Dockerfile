FROM node:22.21.1
ENV NODE_ENV=development
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 5173
