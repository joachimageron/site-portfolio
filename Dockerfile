# Build stage
# On remplace docker.io par public.ecr.aws
FROM public.ecr.aws/docker/library/node:26-alpine3.24 AS builder

WORKDIR /app

# Enable pnpm (pinned: pnpm 12 ignores the "pnpm" field of package.json and breaks --frozen-lockfile)
RUN npm install -g pnpm@10.31.0

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN --mount=type=cache,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
# Idem pour nginx
FROM public.ecr.aws/docker/library/nginx:1.31-alpine3.24

# Copy built assets from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]