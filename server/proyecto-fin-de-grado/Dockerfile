FROM maven
WORKDIR /app
COPY ./src /app/src
COPY pom.xml /app
RUN mvn dependency:go-offline
EXPOSE 8081