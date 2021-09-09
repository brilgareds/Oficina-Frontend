import multer from "multer";

export const uploadFile = multer().array("file");