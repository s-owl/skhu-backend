# Dockerfile 은 Docker Image 빌드 시 필요한 설정과 의존성과 정의함

# 베이스 이미지 정의
FROM debian:stretch-slim

# 의존성 설치 - 패키지 저장소 갱신, 런타임과 로케일 패키지 설치 등
RUN apt-get update && apt-get install -yq \
gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget \
apt-utils python locales fonts-noto-cjk build-essential libfontconfig1-dbg libfontconfig1-dev \
&& wget https://deb.nodesource.com/setup_8.x -O installnodejs.sh \
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

# Add user so we don't need --no-sandbox.
RUN groupadd -r skhususer && useradd -r -g skhususer -G audio,video skhususer \
    && mkdir -p /home/skhususer/Downloads \
    && chown -R skhususer:skhususer /home/skhususer \
    && chown -R skhususer:skhususer /usr/src/app

# 컨테이너의 3000번 포트를 노출
EXPOSE 3000

# Run everything after as non-privileged user.
USER skhususer

# 컨테이너 시작시 실행할 명령어
CMD [ "npm", "start" ]
