FROM node:22.21.1
WORKDIR /app
COPY package.json package-lock.json* ./
COPY . .
RUN npm install
EXPOSE 5173