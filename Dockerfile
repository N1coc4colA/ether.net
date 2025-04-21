FROM node:18-alpine

ENV NEXT_TELEMETRY_DISABLED 1

#RUN apt-get update && apt-get install -y libstdc++6 && rm -rf /var/lib/apt/lists/*
RUN apk add --no-cache libstdc++
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma

EXPOSE 3000

RUN npm run build

CMD npm run start
