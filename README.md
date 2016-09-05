# forest-nodejs

Node.js 기반으로 작성된 foressst API 서버

## 개발자
 - 한영빈 - 소프트웨어공학과 201632034
 - 추건우 - 소프트웨어공학과 201534028
 - 배다슬 - 소프트웨어공학과 201232016

## 서버측 코드 실행 방법

### 직접 실행

 - `nodejs` 와 `npm` 을 설치합니다. 설치 방법은 [nodejs.org](https://nodejs.org) 를 참고하세요.
 - 실행에 필요한 의존성을 설치합니다.
  ```bash
  npm install
  ```
 - 서버측 코드를 실행합니다.
  ```bash
  npm start
  ```

### Docker 를 이용하여 배포 및 실행

  - 먼저 `docker` 를 설치합니다. [docker.com](https://docker.com) 에서 OS 별로 `docker` 를 설치하는 방법을 알 수 있습니다.
  - Docker Image 를 빌드합니다.
  ```bash
  docker build -t forest-nodejs:latest .
  ```
  - 빌드된 Docker Image 를 확인합니다.
  ```bash
  docker images
  ```
  - 빌드한 Docker Image 로 부터 컨테이너를 생성하고, 80번 포트에서 컨테이너의 3000번 포트로 포워딩 하여 데몬 모드로 컨테이너를 시작합니다.
  ```bash
  docker run -d -p 80:3000 forest-nodejs:latest
  ```

### Docker Compose 를 이용하여 배포 및 실행

> 이 방법으로 배포 및 실행하는 경우, 생성되는 Docker Image 에서 3개의 컨테이너가 생성되며, Nginx 를 이용한 역프록시 및 로드밸런싱이 자동으로 설정되어 트래픽이 3개의 컨테이너에 분배되도록 설정됩니다.

  - 먼저 `docker` 와, `docker-compose` 를 설치합니다. `docker` 설치는 `Docker 를 이용하여 배포 및 실행` 부분에서 언급한 방법대로 설치하며, `docker-compose` 의 경우 [docs.docker.com/compose/install/](https://docs.docker.com/compose/install/) 를 참고하여 설치하면 됩니다.
  - 코드를 배포 및 실행합니다.
  ```bash
  docker-compose up
  ```
