import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "auto", // For R2
  endpoint: process.env.STORAGE_ENDPOINT || "https://your-id.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.STORAGE_BUCKET_NAME || "perfectnews-media";

/**
 * Uploads a file to the CDN
 */
export async function uploadToCDN(file: Buffer, fileName: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: contentType,
    ACL: "public-read", // Or use signed URLs for private
  });

  try {
    await s3Client.send(command);
    return `${process.env.STORAGE_PUBLIC_URL}/${fileName}`;
  } catch (error) {
    console.error("CDN Upload Failed:", error);
    throw new Error("Failed to upload to CDN");
  }
}

/**
 * Generates a signed URL for secure uploads
 */
export async function getPresignedUploadUrl(fileName: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    ContentType: contentType,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}
