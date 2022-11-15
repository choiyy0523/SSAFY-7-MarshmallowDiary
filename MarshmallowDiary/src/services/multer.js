// import multer from 'multer';
// import multerS3, { AUTO_CONTENT_TYPE } from 'multer-s3';
// import s3 from '../config/s3_config';

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'marshmallow-bucket',
//     contentType: AUTO_CONTENT_TYPE,
//     acl: 'public-read',
//     key: (req, file, cb) => {
//       //file의 fieldname으로 S3에 저장될 폴더 경로 지정
//       cb(null, `${Date.now()}_${file.originalname}`);
//     },
//   }),
// })

// exports.upload = multer(upload);

// // 커스텀 완료