FROM golang:1.16.2-buster AS builder
WORKDIR /build 
ADD go.mod . 
ADD go.sum . 
RUN go mod download 
ADD . .
RUN go build -o server anirec.go 

FROM debian:buster-slim
WORKDIR /root/
COPY --from=builder /build/server .
EXPOSE 5000 
CMD ["./server"]