FROM node:12 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY public ./public/

# Install app dependencies
RUN npm install
# Generate prisma client, leave out if generating in `postinstall` script
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:12

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public/

EXPOSE 3001
CMD ["npm", "run", "start:prod"]