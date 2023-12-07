import { NextResponse } from "next/server";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "/body-helper-web/public/uploads/articles/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const fileTypes = /jpe?g|jpg|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = mimetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("The only allowed formats are jpg, jpeg, png, webp."));
  }
}

const upload = multer({
  storage,
  fileFilter,
});

const uploadSingleImage = upload.single("image");

export async function POST(request, response) {
  uploadSingleImage(request, response, function (err) {
    if (err) {
      response.status(400).send({ message: err.message });
    }

    NextResponse.json({
      message: "Image uploaded successfully",
      image: `/uploads/articles/${request.file.filename}`,
    });
  });
}
