
//default
const express = require("express");
const router = express.Router();

/**
 *  @swagger
 *  /grade/certificate:
 *    get:
 *      summary: "교내 제출용 성적 증명서 조회"
 *      tags: ["grade"]
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
 *          description: "교내 제출용 성적 증명서 데이터"
 *          schema:
 *            type: object
 *            properties:
 *              userinfo:
 *                type: array
 *                description: "학생 기본 정보"
 *                items:
 *                  type: object
 *                  description: "학생 정보 각 항목"
 *                  properties:
 *                    name:
 *                      type: string
 *                      description: "제목"
 *                    value:
 *                      type: string
 *                      description: "값/내용"
 *              details:
 *                type: array
 *                description: "성적 상세 정보"
 *                items:
 *                  type: object
 *                  description: "각 과목별 성적"
 *                  properties:
 *                    year:
 *                      type: string
 *                      description: "년도"
 *                    semester:
 *                      type: string
 *                      description: "학기"
 *                    code:
 *                      type: string
 *                      description: "과목 코드"
 *                    subject:
 *                      type: string
 *                      description: "과목명"
 *                    type:
 *                      type: string
 *                      description: "이수 구분"
 *                    credit:
 *                      type: string
 *                      description: "취득 학점"
 *                    grade:
 *                      type: string
 *                      description: "성적 등급"
 *              summary:
 *                type: array
 *                description: "취득 학점 요약 정보"
 *                items:
 *                  type: object
 *                  description: "각 학점 유형별 취득 학점 합계"
 *                  properties:
 *                    type:
 *                      type: string
 *                      description: "학점 유형(이수 구분)"
 *                    credit:
 *                      type: string
 *                      description: "취득 학점 합계"
 *              date:
 *                type: string
 *                description: "발급일"
 *        500:
 *          description: "서버 내부 오류"
 */
const certificate = require("./certificate");
router.get("/certificate", certificate);

module.exports = router;

//return
