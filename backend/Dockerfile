# ---------- 1단계: 빌드 (JDK + Gradle로 jar 만들기) ----------
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Gradle 설정 파일을 먼저 복사해 라이브러리를 받아둬요 (코드만 바뀌면 이 단계는 캐시 재사용)
COPY gradlew settings.gradle build.gradle ./
COPY gradle ./gradle
RUN chmod +x gradlew && ./gradlew dependencies --no-daemon > /dev/null

# 소스 코드를 복사해 실행 가능한 jar 하나만 만들어요
COPY src ./src
RUN ./gradlew bootJar --no-daemon && cp build/libs/*.jar app.jar

# ---------- 2단계: 실행 (JRE만 담은 가벼운 이미지) ----------
FROM eclipse-temurin:21-jre
WORKDIR /app

# 보안을 위해 관리자(root)가 아닌 일반 사용자로 실행해요
RUN useradd --system --no-create-home spring
USER spring

COPY --from=build /app/app.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-jar", "app.jar"]
