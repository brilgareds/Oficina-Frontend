import multer from "multer";

export const uploadFile = multer().array("file");
export const uploadSingle = multer().single("file");
