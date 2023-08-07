# 1. Build rust
FROM rust:1.70 as build

# Create a new empty shell project
RUN USER=root cargo new --bin demoapp
WORKDIR /demoapp

# Copy manifests
COPY backend/Cargo.lock ./Cargo.lock
COPY backend/Cargo.toml ./Cargo.toml

# Build dependencies to cache them
RUN cargo build --release
RUN rm src/*.rs

# Update build directory's source code
COPY backend/src ./src
COPY backend/templates ./templates

# Build for release
RUN rm ./target/release/deps/demoapp*
RUN cargo install --path .

# 2. Build client
FROM node:20.3 as webpack
WORKDIR /demoapp

# Build dependencies to cache them
COPY frontend/package.json ./package.json
COPY frontend/yarn.lock ./yarn.lock
RUN yarn install

# Update source code
COPY frontend/src ./src
COPY frontend/tsconfig.json ./tsconfig.json
COPY frontend/webpack.config.js ./webpack.config.js
COPY frontend/.babelrc ./.babelrc
COPY frontend/.eslintrc.cjs ./.eslintrc.cjs

# Build for release
RUN yarn build

# 3. Wrap it all up in a neat little image
FROM debian:bullseye-slim
RUN apt-get -y update && apt-get -y install openssl
WORKDIR /web

# copy the build artifact from the build stage
COPY --from=build /demoapp/target/release/demoapp ./demoapp
COPY backend/templates ./templates
COPY --from=webpack /demoapp/dist ./app/dist

EXPOSE 80

# Run the binary
CMD ["./demoapp"]