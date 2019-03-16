# Dockerfile 은 Docker Image 빌드 시 필요한 설정과 의존성과 정의함

# 베이스 이미지 정의
FROM debian:stretch-slim

# 의존성 설치 - 패키지 저장소 갱신, 런타임과 로케일 패키지 설치 등
RUN apt-get update && apt-get install -y \
wget build-essential apt-utils python locales \
libfontconfig1 libfontconfig1-dbg libfontconfig1-dev curl \
&& wget https://deb.nodesource.com/setup_10.x -O installnodejs.sh \
&& bash installnodejs.sh \
&& apt-get install -y nodejs

# 로케일 변경
RUN localedef -f UTF-8 -i ko_KR ko_KR.UTF-8
ENV LANG ko_KR.UTF-8
ENV LANGUAGE ko_KR:ko
ENV LC_ALL ko_KR.UTF-8

# 앱 디렉터리 생성
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# 서버측 소스코드 복사
COPY . /usr/src/app

# 의존성 설치 - Node.js 모듈
RUN npm install

# 컨테이너의 3000번 포트를 노출
EXPOSE 3000

# 컨테이너 시작시 실행할 명령어
CMD [ "npm", "start" ]
