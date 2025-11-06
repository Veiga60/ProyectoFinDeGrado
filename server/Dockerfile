FROM maven
WORKDIR /app
COPY ./proyecto-fin-de-grado/pom.xml .
RUN mvn -B dependency:go-offline
COPY ./proyecto-fin-de-grado/src /app/src
EXPOSE 8081