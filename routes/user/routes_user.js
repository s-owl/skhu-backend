// 사용자 관련 라우팅 모음

const express = require('express');
const router = express.Router();

// 로그인
// POST - LOGIN
const login = require('./login');
router.post('/login', login);


/**
 *  @swagger
 *  /user/login:
 *    post:
 *      summary: "로그인 기능"
 *      tags: ["user"]
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: userid
 *          type: string
 *          required: true
 *          description: "사용자 학번."
 *        - in: body
 *          name: userpw
 *          type: string
 *          required: true
 *          description: "사용자 비밀번호."
 *      responses:
 *        200:
 *          description: login
 */
const logout = require('./logout');
router.post('/logout', logout);

// 사용자 정보
// POST - USERINFO
const userinfo = require('./userinfo');
router.get('/userinfo', userinfo);

/**
 *  @swagger
 *  /user/credits:
 *    get:
 *      summary: "이수 학점 조회"
 *      tags: ["user"]
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: header
 *          name: Credential
 *          type: string
 *          required: true
 *          description: "로그인 성공 할때 받은 사용자 인증키."
 *      responses:
 *        200:
 *          description: 이수 학점 내역
 *          schema:
 *            type: object
 *            properties:
 *              credits:
 *                type: array
 *                description: "이수 학점 목록"
 *                items:
 *                  type: object
 *                  properties:
 *                    type:
 *                      type: string
 *                      description: "이수 학점 유형"
 *                    earned:
 *                      type: string
 *                      description: "이수학 학점 총량"
 */
const credits = require('./credits');
router.get('/credits', credits);

// 출결 현항 조회
// POST - ATTENDANCE
const attendance = require('./attendance');
router.post('/attendance', attendance);

// 생리공결
// POST - MENSES
const menses = require('./menses');
router.post('/menses', menses);

// 쿠키 만료 여부 확인
// POST - EXPCHECK
const expcheck = require('./expcheck');
router.post('/expcheck', expcheck);

module.exports = router;
