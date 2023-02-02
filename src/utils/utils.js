const sharp = require("sharp");
const s3 = require("../../config/S3_config/s3.config");
let upload = require("../../config/S3_config/multer.config");
const { v1: uuidv4 } = require("uuid");
const fs = require("fs-extra");
const path = require("path");
const AWS = require("aws-sdk");

const RENDER_BAD_REQUEST = (res, error) => {
  console.log(error);
  if (error.message) {
    res.status(400).json({
      code: 400,
      message: error.message,
    });
  } else {
    res.status(400).send(error);
  }
};

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

  sharp(image_data)
    .resize(300, 300)
    .toBuffer(async (err, info) => {
      if (err) {
        console.log(err, "toBuffer error in uploader");
      } else {
        upload.single("file");
        const s3Client = s3.s3Client;
        const params = s3.uploadParams;
        params.Key = savePath + image_file_name;
        params.Body = info;
        params.ContentType = "image/jpeg";
        try {
          let result = await s3Client.upload(params).promise();
          response = image_file_name;
        } catch (err) {
          console.log("error in s3 uploading", err);
        }
      }
    });

  return response;
};
const SEND_NOTIFICATION = async (message) => {
  // Send a message to devices subscribed to the provided topic.
  return admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

//  AWS SES Email
const NOTIFY_BY_EMAIL_FROM_SES = async (
  email,
  subject,
  email_body,
  attachments_file_array = []
) => {
  const SES_CONFIG = {
    accessKeyId: "AKIASFHMCRVPU3V2LPUW",
    secretAccessKey: "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",
    region: "us-west-1",
  };

  const AWS_SES = new AWS.SES(SES_CONFIG);

  let params = {
    Source: "Meta Logix Tech<support@metalogixtech.com>",
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: ["support@metalogixtech.com"],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: email_body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  };
  return AWS_SES.sendEmail(params).promise(); // or something
};
const UPLOAD_SINGLE_IMAGE_on_S3 = async (
  image,
  FILE_PATH,
  file_extension,
  width,
  height = 670
) => {
  if (
    file_extension == ".pdf" ||
    file_extension == ".PDF" ||
    file_extension == ".EXCEL" ||
    file_extension == ".excel" ||
    file_extension == ".DOCX" ||
    file_extension == ".docx" ||
    file_extension == ".mp3" ||
    file_extension == ".XLSX" ||
    file_extension == ".xlsx" ||
    file_extension == ".XLS" ||
    file_extension == ".xls" ||
    file_extension == ".CSV" ||
    file_extension == ".csv" ||
    file_extension == ".DOC" ||
    file_extension == ".doc" ||
    file_extension == ".GIF" ||
    file_extension == ".gif"
  ) {
    const myPromise = new Promise(async (resolve, reject) => {
      let path = FILE_PATH + uuidv4() + file_extension;

      upload.single("file");
      const s3Client = s3.s3Client;
      const params = s3.uploadParams;
      params.Key = path;
      params.Body = image.data;
      params.ContentType = image.mimetype;
      try {
        let result = await s3Client.upload(params).promise();
      } catch (err) {
        console.log("error in s3 uploading", err);
        reject(err);
      }

      resolve(path);
    });
    return myPromise;
  } else {
    const myPromise = new Promise(async (resolve, reject) => {
      let path = FILE_PATH + uuidv4() + file_extension;
      sharp(image.data)
        .resize(width, height, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .withMetadata()
        .toBuffer(async (err, info) => {
          if (err) {
            console.log(err, "toBuffer error in uploader");
          } else {
            upload.single("file");
            const s3Client = s3.s3Client;
            const params = s3.uploadParams;
            params.Key = path;
            params.Body = info;
            params.ContentType = "image/jpeg";
            try {
              let result = await s3Client.upload(params).promise();
            } catch (err) {
              console.log("error in s3 uploading", err);
              reject(err);
            }
          }
        });
      resolve(path);
    });
    return myPromise;
  }
};

const UPLOAD_IMAGE_on_S3 = async (image, image_size_array, FILE_PATH) => {
  const myPromise = new Promise(async (resolve, reject) => {
    let file_extension = path.extname(image.name);

    if (file_extension == ".GIF" || file_extension == ".gif") {
      let main_images_obj = {};
      for (var a = 0; a < image_size_array.length; a++) {
        let height = image_size_array[a].height;
        let width = image_size_array[a].width;
        let path = FILE_PATH + uuidv4() + file_extension;

        upload.single("file");
        const s3Client = s3.s3Client;
        const params = s3.uploadParams;
        params.Key = path;
        params.Body = image.data;
        params.ContentType = image.mimetype;
        // params.ContentType = "image/jpeg";
        try {
          let result = await s3Client.upload(params).promise();
        } catch (err) {
          //console.log("error in s3 uploading", err);
          reject(err);
        }

        let obj_name = image_size_array[a].name;
        let main_image_obj = {
          [obj_name]: path,
        };
        main_images_obj = { ...main_images_obj, ...main_image_obj };
      }
      resolve(main_images_obj);
    } else {
      let main_images_obj = {};
      for (var a = 0; a < image_size_array.length; a++) {
        let height = image_size_array[a].height;
        let width = image_size_array[a].width;
        let path = FILE_PATH + uuidv4() + file_extension;

        sharp(image.data)
          .resize(width, height, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
          })
          .withMetadata()
          .toBuffer(async (err, info) => {
            if (err) {
              //console.log(err, "toBuffer error in uploader");
              reject(err);
            } else {
              upload.single("file");
              const s3Client = s3.s3Client;
              const params = s3.uploadParams;
              params.Key = path;
              params.Body = info;
              //  params.ContentType = image.mimetype;
              params.ContentType = "image/jpeg";
              try {
                let result = await s3Client.upload(params).promise();
              } catch (err) {
                //console.log("error in s3 uploading", err);
              }
            }
          });
        let obj_name = image_size_array[a].name;
        let main_image_obj = {
          [obj_name]: path,
        };
        main_images_obj = { ...main_images_obj, ...main_image_obj };
      }
      resolve(main_images_obj);
    }
  });
  return myPromise;
};

module.exports = {
  RENDER_BAD_REQUEST,
  UPLOAD_AND_RESIZE_FILE,
  UPLOAD_AUDIO_FILE,
  UPLOAD_S3_IMAGE,
  SEND_NOTIFICATION,
  NOTIFY_BY_EMAIL_FROM_SES,
  UPLOAD_SINGLE_IMAGE_on_S3,
  UPLOAD_IMAGE_on_S3,
};
