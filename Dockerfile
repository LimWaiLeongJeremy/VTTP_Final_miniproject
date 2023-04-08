FROM node:19 as angular

WORKDIR /app

COPY client/angular.json .
COPY client/package.json .
COPY client/package-lock.json .
COPY client/tsconfig.json .
COPY client/tsconfig.app.json .
COPY client/tsconfig.spec.json .
COPY client/src ./src

RUN npm install -g @angular/cli

RUN npm install
RUN ng build

FROM maven:3.9.0-eclipse-temurin-19 as springboot

WORKDIR /app

COPY server/mvnw .
COPY server/mvnw.cmd .
COPY server/pom.xml .
COPY server/src ./src

COPY --from=angular /app/dist/client ./scr/main/resource/static


RUN mvn package -Dmaven.test.skip=true

FROM eclipse-temurin:19-jre

WORKDIR /app

COPY --from=springboot /app/target/server-0.0.1-SNAPSHOT.jar server.jar

ENV PORT=8080
ENV SPRINGBOOT_DATASOURCE_PASSWORD=AVNS_4adBZafc0wwLpujFjsW
ENV SPRING_REDIS_PASSWORD=vlTmLvegQwQxcvYkKnrJZjqu9HrS7YIM


EXPOSE ${PORT}

ENTRYPOINT java -Dserver.port=${PORT} -jar server.jar
