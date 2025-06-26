# --- STAGE 1: The "Builder" ---
# We start with a lightweight version of Node.js to build our app.
# '18-alpine' is small and efficient.
FROM node:18-alpine AS builder

# Set the working directory inside the container.
WORKDIR /app

# Copy ONLY the package.json and package-lock.json from our client folder.
# This is a key optimization. Docker caches this step, so it won't
# re-install all dependencies unless these files change.
COPY client/package*.json ./

# Install the dependencies.
RUN npm install

# Now, copy the rest of our client application's source code.
COPY client/ ./

# Run the production build command. This creates the /app/build folder.
RUN npm run build

# --- STAGE 2: The "Production Server" ---
# Now, we start with a fresh, tiny web server image.
FROM nginx:stable-alpine

# Copy the *only* thing we need from our "Builder" stage: the built app.
# We copy the contents of /app/build from the 'builder' stage
# into Nginx's default folder for serving websites.
COPY --from=builder /app/build /usr/share/nginx/html

# Tell Docker that the container will listen on port 80.
EXPOSE 80

# The command to start the Nginx server when the container runs.
CMD ["nginx", "-g", "daemon off;"]