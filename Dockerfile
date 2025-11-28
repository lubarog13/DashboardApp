FROM node:lts-alpine as build-stage
# Define build arguments for environment variables
ARG VITE_BACKEND_URL

# Set environment variables during the build process
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN echo "BASE_URL='/'" > .env

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]