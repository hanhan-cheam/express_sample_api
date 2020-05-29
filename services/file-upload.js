const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
 
aws.config.update({
    secretAccessKey:'R+L/vJ+VfTLh/mjuhRNszMgsSp1W2BIiXTk3hOrd',
    accessKeyId:'AKIAJQSNMU54HJNWFGGQ',
    region:'ap-southeast-1'
});



const s3 = new aws.S3()

const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true)
  }else{
    cb(new Error('Invalid Mime Type,only JPEG and PNG'),false)
  }
}

 
const upload = multer({
  fileFilter:fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'sample-images-ping',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA!'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})
 
module.exports = upload




