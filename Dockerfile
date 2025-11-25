# =========================
#   1) Build the project
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production=false

COPY . .

# Build Next.js (SSG happens here)
RUN npm run build


# =========================
#   2) Run the production server
# =========================
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only essential build output
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose Next.js port
EXPOSE 3000

CMD ["npm", "start"]
