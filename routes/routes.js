// 각종 라우팅을 연결하는 코드

// Express 프레임워크의 라우팅 모듈 로드
const express = require('express');
const router = express.Router();

// 서버 정보 표시
// 메소드 : GET　|　요청 경로 : /
const serverinfo = require('./serverinfo');
router.get('/', serverinfo);

// 사용자 관련 라우팅
// 요청 경로 : /user/*
const user = require('./user/routes_user');
router.use('/user', user);

// 수업 관리 관련 라우팅
// 요청 경로 : /class/*
const classs = require('./class/routes_class');
router.use('/class', classs);

// 수강관리 관련 라우팅
// 요청 경로 : /enroll/*
const enroll = require('./enroll/routes_enroll');
router.use('/enroll', enroll);

// 장학관리 관련 라우팅
// 요청 경로 : /scholarship/*
const scholarship = require('./scholarship/routes_scholarship');
router.use('/scholarship', scholarship);

// 성적관리 관련 라우팅
// 요청 경로 : /grade/*
const grade = require('./grade/routes_grade');
router.use('/grade', grade);

// 세부사항 페이지 관련 라우팅
// 요청 경로 : /page/*
const page = require('./page/routes_page');
router.use('/page', page);

// 학교생활 관련 라우팅
// 요청 경로 : /life/*
const life = require('./life/routes_life');
router.use('/life', life);

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    info: {
      title: 'SKHU Backend', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  apis: ['routes/user/routes_user.js',
         'routes/scholarship/routes_scholarship.js',
         'routes/page/routes_page.js',
         'routes/life/routes_life.js',
         'routes/grade/routes_grade.js',
         'routes/enroll/routes_enroll.js',
         'routes/class/routes_class.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 다른 모듈에서 사용 가능하도록 노출
module.exports = router;
