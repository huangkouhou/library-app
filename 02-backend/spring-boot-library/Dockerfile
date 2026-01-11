# ---------- build ----------
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# 1. 先只复制 pom.xml
COPY pom.xml .

# 2. [关键优化] 预先下载依赖 (这一步会被缓存，除非你改了 pom.xml)
# 这一步能节省大量的构建时间
RUN mvn dependency:go-offline -B

# 3. 再复制源代码
COPY src ./src

# 4. 开始打包 (因为依赖已经有了，这里只编译代码，飞快)
RUN mvn clean package -DskipTests

# ---------- runtime ----------
FROM eclipse-temurin:17-jre
WORKDIR /app
# 这里加个通配符虽然方便，但如果 target 下有多个 jar 会报错
# 建议明确一点，或者确保 target 下只有一个 jar (Spring Boot 默认也是这样)
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]