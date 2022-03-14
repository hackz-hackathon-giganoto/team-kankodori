FROM golang:1.17.7-bullseye AS build-env

#  App
#-----------------------------------------------
ENV APP_ROOT $GOPATH/src
RUN ln -s $APP_ROOT/ /app
WORKDIR /app

COPY go.mod $APP_ROOT/
COPY go.sum $APP_ROOT/
RUN go mod download

COPY . $APP_ROOT/

RUN go build -o bin/server


##  Runtime build stage
##-----------------------------------------------
FROM debian:bullseye-slim

WORKDIR /app/bin
#  Timezone
#-----------------------------------------------
ENV TZ Asia/Tokyo

# Application
#-----------------------------------------------
COPY --from=build-env /app/bin/ /app/bin/
ENV PATH /app/bin:$PATH
RUN chmod a+x server


CMD ["./server"]