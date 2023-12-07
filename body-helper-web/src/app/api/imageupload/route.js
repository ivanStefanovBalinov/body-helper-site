import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path, { join } from "path";
import { promisify } from "util";
import formidable from "formidable";
import fs from "fs";

const writeFileAsync = promisify(fs.writeFile);

export async function POST(request) {
  // const data = await request.formData();
  // const file = data.get("image");

  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "public/uploads/articles");

  const fields = await new Promise((resolve, reject) => {
    form.parse(request, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const uploadedFile = fields.files.image;

  if (!uploadedFile) {
    return NextResponse.json(
      { message: "Upload fail...", success: false },
      { status: 500 }
    );
  }

  console.log("[UPLOADED FILE:]", uploadedFile);

  const path = path.join(
    process.cwd(),
    "public/uploads/articles",
    uploadedFile.name
  );

  await writeFileAsync(path, fs.readFileSync(uploadedFile.path));

  return NextResponse.json({ message: "Image uploaded" });

  // if (!file) {
  //   return NextResponse.json(
  //     { message: "Upload fail...", success: false },
  //     { status: 500 }
  //   );
  // }
  // console.log("DATA:", data, "FILE:", file);
  // console.log("CURRENT_DIR:", process.cwd());

  // const bytes = await file.arrayBuffer();
  // const buffer = Buffer.from(bytes);

  // const path = join(process.cwd(), "public/uploads/articles", file.name);
  // // await writeFile(path, buffer);
  // await writeFile(path, file);

  // return NextResponse.json({ message: "Uploading..." });
}
