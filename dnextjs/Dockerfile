FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable pnpm
RUN pnpm config set registry https://registry.npmmirror.com
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build


FROM node:20-alpine AS runner
WORKDIR /app
RUN corepack enable pnpm
RUN pnpm config set registry https://registry.npmmirror.com
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --prod
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["pnpm","start"]
