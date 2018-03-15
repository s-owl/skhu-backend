const express = require('express');
const router = express.Router();


/**
 *  @swagger
 *  /life/schedules:
 *    post:
 *      summary: "학사 일정 조회"
 *      tags: ["life"]
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: year
 *          type: string
 *          required: true
 *          description: "조회할 학사일정 년도"
 *        - in: body
 *          name: month
 *          type: string
 *          required: true
 *          description: "조회할 학사일정 월"
 *      responses:
 *        200:
 *          description: "해당 년월 학사 일정"
 *          schema:
 *            type: object
 *            properties:
 *              schedules:
 *                type: array
 *                description: "해당 년월 학사 일정 목록"
 *                items:
 *                  type: object
 *                  properties:
 *                    period:
 *                      type: string
 *                      description: "기간"
 *                    content:
 *                      type: string
 *                      description: "일정 내용"
 *        500:
 *          description: "서버 내부 오류"
 */
const schedules = require('./schedules');
router.post('/schedules', schedules);

/**
 *  @swagger
 *  /life/meal/urls:
 *    get:
 *      summary: "학식 식단표 목록 링크 조회"
 *      tags: ["life"]
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: "식단표 링크 목록"
 *          schema:
 *            type: object
 *            properties:
 *              urls:
 *                type: array
 *                description: "식단표 링크 목록"
 *                items:
 *                  type: object
 *                  properties:
 *                    title:
 *                      type: string
 *                      description: "식단표 제목"
 *                    url:
 *                      type: string
 *                      description: "식단표 URL 링크"
 *                    date:
 *                      type: string
 *                      description: "식단표 게시 날짜"
 *        500:
 *          description: "서버 내부 오류"
 */
const meal_urls = require('./meal').getUrls;
router.get('/meal/urls', meal_urls);

/**
 *  @swagger
 *  /life/meal/data:
 *    post:
 *      summary: "학식 식단표 데이터 조회"
 *      tags: ["life"]
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: url
 *          type: string
 *          required: true
 *          description: "식단표 URL"
 *      responses:
 *        200:
 *          description: "학식 식단표 데이터"
 *          schema:
 *            type: object
 *            properties:
 *              data:
 *                type: array
 *                description: "학식 식단표 데이터"
 *                items:
 *                  type: object
 *                  properties:
 *                    day:
 *                      type: string
 *                      description: "요일"
 *                    date:
 *                      type: string
 *                      description: "날짜"
 *                    lunch:
 *                      type: object
 *                      description: "점심 식단"
 *                      properties:
 *                        a:
 *                          type: object
 *                          description: "코스A"
 *                          properties:
 *                            diet:
 *                              type: string
 *                              description: 식단 내용
 *                            calorie:
 *                              type: string
 *                              description: 식단 열량
 *                        b:
 *                          type: object
 *                          description: "코스B"
 *                          properties:
 *                            diet:
 *                              type: string
 *                              description: 식단 내용
 *                            calorie:
 *                              type: string
 *                              description: 식단 열량
 *                        c:
 *                          type: object
 *                          description: "코스C"
 *                          properties:
 *                            diet:
 *                              type: string
 *                              description: 식단 내용
 *                            calorie:
 *                              type: string
 *                              description: 식단 열량
 *                    dinner:
 *                      type: object
 *                      description: "저녁 식단"
 *                      properties:
 *                        a:
 *                          type: object
 *                          description: "코스A"
 *                          properties:
 *                            diet:
 *                              type: string
 *                              description: 식단 내용
 *                            calorie:
 *                              type: string
 *                              description: 식단 열량
 *        500:
 *          description: "서버 내부 오류"
 */
const meal_data = require('./meal').getData;
router.post('/meal/data', meal_data);

// 상담 이력 조회 - 안해도 됌
// POST　-　consulting
const consulting = require('./consulting');
router.post('/consulting', consulting);

module.exports = router;
