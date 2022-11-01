FROM openjdk:11-jdk as builder
WORKDIR application
RUN chmod +x ./gradlew
RUN dos2unix ./gradlew
RUN ./gradlew clean build
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} application.jar
RUN java -Djarmode=layertools -jar application.jar extract # --destination

FROM openjdk:11-jdk
WORKDIR application
ENV port 9090
ENV spring.profiles.active local
COPY --from=builder application/dependencies/ ./
COPY --from=builder application/spring-boot-loader/ ./
COPY --from=builder application/snapshot-dependencies/ ./
COPY --from=builder application/application/ ./

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]
