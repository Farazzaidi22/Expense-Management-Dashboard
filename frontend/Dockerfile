# frontend/Dockerfile
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with pnpm
RUN pnpm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["pnpm", "run", "dev", "--host"]