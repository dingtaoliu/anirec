FROM golang:1.16.2-buster AS go_builder
WORKDIR /api 
ADD api/src/go.mod api/src/go.sum . 
RUN go mod download 
ADD api/src .
RUN go build -o server anirec.go 

FROM node:14.1-alpine AS react_builder
WORKDIR /app
ADD app/package.json app/package-lock.json .
ENV PATH="./node_modules/.bin:$PATH"
RUN npm install
ADD app .
RUN npm run build

FROM debian:buster-slim
WORKDIR /root/
COPY --from=go_builder api/server .
COPY --from=react_builder app/build ./build
EXPOSE 5000 
CMD ["./server"]