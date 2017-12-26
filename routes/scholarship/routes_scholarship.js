const express = require('express');
const router = express.Router();

/**
 *  @swagger
 *  /scholarship/result:
 *    get:
 *      summary: "장학 결과 조회"
 *      tags: ["scholarship"]
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
 *          description: "장학 내역"
 *          schema:
 *            type: object
 *            properties:
 *              userinfo:
 *                type: object
 *                description: "학생 기본 정보"
 *                properties:
 *                  univtype:
 *                    type: string
 *                    description: "대학 유형"
 *                  depart:
 *                    type: string
 *                    description: "학부"
 *                  major:
 *                    type: string
 *                    description: "전공"
 *                  course:
 *                    type: string
 *                    description: "과정"
 *                  id:
 *                    type: string
 *                    description: "학번"
 *                  name:
 *                    type: string
 *                    description: "이름"
 *                  status:
 *                    type: string
 *                    description: "상태"
 *                  phone:
 *                    type: string
 *                    description: "전화번호"
 *              apply_results:
 *                type: array
 *                description: "장학 결과 목록"
 *                items:
 *                  type: object
 *                  properties:
 *                    year:
 *                      type: string
 *                      description: "장년도"
 *                    semester:
 *                      type: string
 *                      description: "학기"
 *                    date:
 *                      type: string
 *                      description: "날짜"
 *                    type:
 *                      type: string
 *                      description: "장학 유형"
 *                    reason:
 *                      type: string
 *                      description: "장학 반려 사유"
 *                    result:
 *                      type: string
 *                      description: "장학 결과"
 *        204:
 *          description: 조회 결과 데이터가 없음. 또는 조회 기간이 아님.
 *        500:
 *          description: "서버 내부 오류"
 */
const result = require('./result');
router.get('/result', result);

/**
 *  @swagger
 *  /scholarship/history:
 *    get:
 *      summary: "장학 내역 조회"
 *      tags: ["scholarship"]
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
 *          description: "장학 내역"
 *          schema:
 *            type: object
 *            properties:
 *              scholarship_history:
 *                type: array
 *                description: "장학 내역 목록"
 *                items:
 *                  type: object
 *                  properties:
 *                    year:
 *                      type: string
 *                      description: "장학 년도"
 *                    semester:
 *                      type: string
 *                      description: "장학 학기"
 *                    scholarship_name:
 *                      type: string
 *                      description: "장학 이름"
 *                    order:
 *                      type: string
 *                      description: "장학 차수"
 *                    grade:
 *                      type: string
 *                      description: "학년"
 *                    amount_entrance:
 *                      type: string
 *                      description: "입학 장학 금액"
 *                    amount_class:
 *                      type: string
 *                      description: "수업 장학 금액"
 *                    benefit_type:
 *                      type: string
 *                      description: "수혜 구분"
 *                    note:
 *                      type: string
 *                      description: "비고"
 *        500:
 *          description: "서버 내부 오류"
 */
const history = require('./history');
router.get('/history', history);

module.exports = router;
