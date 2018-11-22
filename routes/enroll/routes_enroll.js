//default
const express = require("express");
const router = express.Router();

// 개설과목 조회
// GET - SUBJECTS


const subjects = require("./subjects");
router.get("/subjects", subjects);
router.post("/subjects", subjects);


// 학점 세이브 조회

const saved_credits = require("./saved_credits");
router.get("/saved_credits", saved_credits);
module.exports = router;
