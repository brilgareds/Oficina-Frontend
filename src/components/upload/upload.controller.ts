import { Request, Response } from "express";
import { before, POST, route } from "awilix-express";
import { v4 } from "uuid";
import { uploadFileBlob } from "../../services/azure-blob";
import { uploadFile } from "../common/middlewares/uploadFile";

@route("/api/v1/upload")
export class SurveyController {
  @route("/")
  @POST()
  @before([uploadFile])
  public async getCovidSurveyQuestions(req: Request, res: Response) {
    try {
      const files = req.files as Express.Multer.File[];
      const folder = "ejemplo";

      files.map(async (file: Express.Multer.File) => {
        const fileName = `${folder}/${v4()}.${file.mimetype.split("/")[1]}`;

        await uploadFileBlob(fileName, file.buffer);
      });

      res.status(200).json({ data: { message: "ok" } });
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  }
}
