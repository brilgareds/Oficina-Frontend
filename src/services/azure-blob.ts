// https://controlfdata.blob.core.windows.net/vumoffice
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { Readable } from "stream";
import { azure } from "../config/filesystem";

export const uploadFileBlob = async (path: string, content: Buffer) => {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    azure.account,
    azure.key
  );
  const blobServiceClient = new BlobServiceClient(
    `https://${azure.account}.blob.core.windows.net`,
    sharedKeyCredential
  );
  const containerClient = blobServiceClient.getContainerClient(azure.container);
  const stream = bufferToStream(content);
  const blockBlobClient = containerClient.getBlockBlobClient(path);

  await blockBlobClient.uploadStream(stream);
};

const bufferToStream = (binary: any) => {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    },
  });

  return readableInstanceStream;
};
