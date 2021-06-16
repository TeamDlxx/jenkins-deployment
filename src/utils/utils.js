const sharp = require("sharp");
const s3 = require("../../config/S3_config/s3.config");
let upload = require("../../config/S3_config/multer.config");
const { TYPE_IMAGE, TYPE_AUDIO } = require("../utils/constants");
const { v1: uuidv4 } = require("uuid");
const fs = require("fs-extra");
const path = require("path");

const RENDER_BAD_REQUEST = (res, error) => {
  console.log(error);
  if (error.message) {
    res.status(400).json({
      message: error.message,
    });
  } else {
    res.status(400).send(error);
  }
};
// change order in delete case
const CHANGE_DEL_ORDER = async (_id, current_order, schema) => {
  let doc = await schema.find({
    _id: {
      $ne: _id,
    },
    order: {
      $gte: current_order,
    },
  });
  const promise = doc.map(async (Obj) => {
    Obj.order = Obj.order - 1;
    await Obj.save();
  });
  await Promise.all(promise);
};

//ORDER_CHANGE_TO_LOWER
const ORDER_CHANGE_TO_LOWER = async (
  _id,
  current_order,
  past_order,
  schema
) => {
  let doc = await schema.find({
    _id: {
      $ne: _id,
    },
    order: {
      $gte: past_order,
      $lte: current_order,
    },
  });
  const promise = doc.map(async (Obj) => {
    Obj.order = Obj.order + 1;
    await Obj.save();
  });
  await Promise.all(promise);
};

//_ORDER_CHANGE_TO_UPPER
const ORDER_CHANGE_TO_UPPER = async (
  _id,
  current_order,
  past_order,
  schema
) => {
  let doc = await schema.find({
    _id: {
      $ne: _id,
    },
    order: {
      $gte: current_order,
      $lte: past_order,
    },
  });
  console.log(doc, "this is doc");
  const promise = doc.map(async (Obj) => {
    Obj.order = Obj.order - 1;
    await Obj.save();
  });
  await Promise.all(promise);
};

const SEND_EMAIL = async (code, receiver) => {
  require("dotenv").config();
  const sg_mail = require("@sendgrid/mail");
  console.log(process.env.EMAIL_API_KEY, "KEY");
  sg_mail.setApiKey(process.env.EMAIL_API_KEY);
  const message = {
    to: receiver,
    from: process.env.EMAIL_FROM,
    subject: "Verification code",
    text: `Here is code you can use to reset password ${code}`,
    //html: "<h1>This is html</h1>",
  };
  const result = await sg_mail
    .send(message)
    .then((res) => {
      console.log("Email Sent");
      return res;
    })
    .catch((err) => {
      console.log("Email did not  Send", err);
      return err;
    });
  return result;
};
///////////Upload File
const UPLOAD_AUDIO_FILE = async (files, resp) => {
  const myPromise = new Promise(async (resolve, reject) => {
    try {
      let image_file = files.audio;
      let file_name = path.extname(files.audio.name);
      //define upload file name store url
      let audio_file_name = uuidv4() + file_name;
      let audio_path = audio_file_name;
      let file_path = "./src/utils/audio/" + audio_file_name;
      fs.mkdirsSync("./src/utils/audio/");
      image_file.mv(file_path, async (err) => {
        if (err) {
          resp.error = true;
          resp.error_message = err;
          return resp;
        } else {
          resolve(audio_path);
        }
      });
    } catch (error) {
      resp.error = true;
      resp.error_message = error;
      return resp;
    }
  });

  return myPromise;
};

const UPLOAD_AND_RESIZE_FILE = async (image_buffer_data, dir, image_size) => {
  const myPromise = new Promise(async (resolve, reject) => {
    try {
      let image_name = uuidv4() + ".jpeg";
      await sharp(image_buffer_data)
        .jpeg({
          quality: 100,
          chromaSubsampling: "4:4:4",
        })
        .resize(image_size)
        .toFile(dir + image_name, async (err, info) => {
          if (err) resolve(false);
        });
      resolve(image_name);
    } catch (error) {
      console.log(error, "error in uploading");
      resolve(false);
    }
  });

  return myPromise;
};

const UPLOAD_S3_IMAGE = async (img_name, dir, image_data) => {
  let response = {};
  let image_file_name = "";
  let savePath = dir;
  image_file_name = img_name;
  upload.single("file");
  const s3Client = s3.s3Client;
  const params = s3.uploadParams;
  params.Key = savePath + image_file_name;
  params.Body = image_data;
  params.ContentType = "image/jpeg";
  try {
    let a = await s3Client.upload(params).promise();
    response.status = true;
    response.image_file_name = image_file_name;
  } catch (err) {
    response.status = false;
    response.error = err;
    console.log("error", err);
  }

  return response;
};

module.exports = {
  RENDER_BAD_REQUEST,
  CHANGE_DEL_ORDER,
  ORDER_CHANGE_TO_LOWER,
  ORDER_CHANGE_TO_UPPER,
  SEND_EMAIL,
  UPLOAD_AND_RESIZE_FILE,
  UPLOAD_AUDIO_FILE,
  UPLOAD_S3_IMAGE,
};
