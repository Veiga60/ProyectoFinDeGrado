FROM maven
WORKDIR /app
COPY pom.xml /app
RUN mvn dependency:go-offline
EXPOSE 8081