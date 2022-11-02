FROM openjdk:11-jdk as builder
WORKDIR application
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} ./
RUN java -Djarmode=layertools -jar marshmallow.jar extract # --destination

FROM openjdk:11-jdk
WORKDIR application
ENV port 9090
ENV spring.profiles.active local
COPY --from=builder application/dependencies/ ./
COPY --from=builder application/spring-boot-loader/ ./
COPY --from=builder application/snapshot-dependencies/ ./
COPY --from=builder application/application/ ./

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
