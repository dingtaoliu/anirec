From golang 

WORKDIR /build 

ADD go.mod . 
ADD go.sum . 
RUN go mod download 

COPY . .

RUN go build anirec.go 

EXPOSE 3000 

CMD ["./anirec"]