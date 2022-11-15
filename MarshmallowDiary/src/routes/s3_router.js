// import { Router } from 'express';
// var router = Router();
// const register = require('../controller/s3_controller');
// import { upload } from '../services/multer';

// // 이미지 업로드
// router.post("/images", upload.array("photo"), async (req, res, next) => {
//   console.log("이미지 업로드 접근")
//   console.log("req.files의 모습", req.files)
//   res.json(req.files.map((v) => v.location)) // multer-s3는 locationd에 있다.
//   //res.json(req.files.map((v)=> v.filename)) // 파일 이름 배열 보내주기(일반 멀터)
// })

// export default router;