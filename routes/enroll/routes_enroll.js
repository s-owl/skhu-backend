const express = require("express");
const router = express.Router();

// 개설과목 조회
// GET - SUBJECTS
/**
 *  @swagger
 *  /user/subject:
 *    get:
 *      summary: "개설과목 조회"
 *      tags: ["enroll"]
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
 *          description: "개설과목 데이터"
 *          schema:
 *            type: object
 *            properties:
 *              list:
 *                type: array
 *                description: "개설과목 데이터 배열"
 *                items:
 *                  type: object
 *                  properties:
 *                    type:
 *                      type: string
 *                      description: "타입"
 *                    grade:
 *                      type: string
 *                      description: "학년"
 *                    code:
 *                      type: string
 *                      description: "과목코드"
 *                    class:
 *                      type: string
 *                      description: "강의실"
 *                    subject:
 *                      type: string
 *                      description: "강의명"
 *                    score:
 *                      type: string
 *                      description: "학점"
 *                    professor:
 *                      type: string
 *                      description: "교수명"
 *                    grade_limit:
 *                      type: string
 *                      description: "학년제한"
 *                    major_limit:
 *                      type: string
 *                      description: "학과제한"
 *                    time:
 *                      type: string
 *                      description: "시간"
 *                    note:
 *                      type: string
 *                      description: "메모"
 *                    available:
 *                      type: string
 *                      description: "신청가능여부"
 *              options:
 *                type: object
 *                description: "개성과목 조회 시 사용 가능한 옵션"
 *                properties:
 *                  semester:
 *                    type: array
 *                    description: "선택가능한 학기 목록"
 *                    items:
 *                      type: string
 *                  major:
 *                    type: array
 *                    description: "선택가능한 전공 목록"
 *                    items:
 *                      type: string
 */
const subjects = require("./subjects");
router.get("/subjects", subjects);
router.post("/subjects", subjects);

/**
 *  @swagger
 *  /enroll/saved_credits:
 *    get:
 *      summary: "학점 세이브 조회"
 *      tags: ["enroll"]
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
 *          description: "학점 세이브 현황"
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: object
 *                properties:
 *                  accured:
 *                    type: string
 *                    description: "누적학점"
 *                  accrued_criteria:
 *                    type: string
 *                    description: "누적학점 기준(누적시기)"
 *                  used:
 *                    type: string
 *                    description: "사용학점"
 *                  used_criteria:
 *                    type: string
 *                    description: "사용학점 기준(사용시기)"
 *                  available:
 *                    type: string
 *                    description: "사용 가능 학점"
 *              details:
 *                type: array
 *                description: "학점 세이브 상세사항"
 *                items:
 *                  type: object
 *                  properties:
 *                    year:
 *                      type: string
 *                      description: "년도"
 *                    semester:
 *                      type: string
 *                      description: "학기"
 *                    saved:
 *                      type: string
 *                      description: "세이브 학점"
 *                    used:
 *                      type: string
 *                      description: "사용 학점"
 *        500:
 *          description: "서버 내부 오류"
 */
const saved_credits = require("./saved_credits");
router.get("/saved_credits", saved_credits);
module.exports = router;
