FROM node:20-alpine

COPY api/dist /app/dist
COPY api/node_modules /app/node_modules
COPY api/package*.json /app/
COPY hr-service.yaml /

WORKDIR /app

EXPOSE 8000

ENV PORT=8000
ENV DB_URL='mongodb://172.17.0.2:27017/test'
CMD ["node", "dist/index.js"]