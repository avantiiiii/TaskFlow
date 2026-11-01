# Stage 1: Build React frontend
FROM node:22-alpine AS frontend-build

WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build


# Stage 2: Run Node.js backend
FROM node:22-alpine

WORKDIR /app/server

COPY server/package*.json ./
RUN npm ci --omit=dev

COPY server/ ./

# Copy React production build into Express public folder
COPY --from=frontend-build /app/client/dist ./public

EXPOSE 5000

CMD ["npm", "start"]