// 사용자 관련 라우팅 모음

const express = require("express");
const router = express.Router();

// 로그인
// POST - LOGIN
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
 *          description: "로그인 성공시 얻는 인증 토큰"
 *          schema:
 *            type: object
 *            properties:
 *              credential-old:
 *                type: string
 *                description: forest.skhu.ac.kr 인증 토큰
 *              credential-new:
 *                type: string
 *                description: sam.skhu.ac.kr 인증 토큰1
 *              credential-new-token:
 *                type: string
 *                description: sam.skhu.ac.kr 인증 토큰2
 *        400:
 *          description: "로그인 실패 - 파라메터가 올바른 형식이 아님"
 *        401:
 *          description: "로그인 실패 - 학번 또는 비밀번호 재확인 요망"
 */
const login = require("./login");
router.post("/login", login);

// 사용자 정보
// GET - USERINFO
/**
 *  @swagger
 *  /user/userinfo:
 *    get:
 *      summary: "사용자 정보"
 *      tags: ["user"]
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: header
 *          name: Credential
 *          type: string
 *          required: true
 *          description: "로그인 성공 할때 받은 사용자 인증키"
 *      responses:
 *        200:
 *          description: "사용자 정보"
 *          schema:
 *            type: object
 *            properties:
 *              userinfo:
 *                type: object
 *                description: "사용자 데이터객체"
 *                properties:
 *                  name:
 *                    type: string
 *                    description: "이름"
 *                  id:
 *                    type: string
 *                    description: "학번"
 */

const userinfo = require("./userinfo");
router.get("/userinfo", userinfo);

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
const credits = require("./credits");
router.get("/credits", credits);

// 출결 현항 조회
// POST - ATTENDANCE
/**
 *  @swagger
 *  /user/attendance:
 *    post:
 *      summary: "출결 현황 조회 (업데이트 필요)"
 *      tags: ["user"]
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: cookie
 *          type: string
 *          description: "로그인 세션 쿠키"
 *          required: true
 *      responses:
 *        200:
 *          description: "출결 현황 데이터"
 *          schema:
 *            type: object
 *            properties:
 *              attendance:
 *                type: array
 *                description: "출결 현황 데이터 배열"
 *                items:
 *                  type: object
 *                  properties:
 *                    subject:
 *                      type: string
 *                      description: "과목"
 *                    time:
 *                      type: string
 *                      description: "시간"
 *                    attend:
 *                      type: string
 *                      description: "출석"
 *                    late:
 *                      type: string
 *                      description: "지각"
 *                    absence:
 *                      type: string
 *                      description: "결석"
 *                    approved:
 *                      type: string
 *                      description: "공결"
 *                    menstrual:
 *                      type: string
 *                      description: "생리공결"
 *                    early:
 *                      type: string
 *                      description: "조퇴"
 */
const attendance = require("./attendance");
router.get("/attendance", attendance.get);
router.post("/attendance", attendance.post);

// 생리공결
// POST - MENSES
// const menses = require("./menses");
// router.post("/menses", menses);

module.exports = router;
