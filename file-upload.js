const express = require('express')
const router = express.Router();
const Response = require('./helpers/Respond')
const upload = require('./services/file-upload');
const User = require('./controller/User')
const singleUpload = upload.single('file_img')

router.post('/image-upload/:id',function(req,res){
    singleUpload(req,res,function(err){
        const id = parseInt(req.params.id)
        if(err){
            return res.status(422).send({errors:[{title:"File Upload Error",detail:err.message}]});
        }
        var file_url
        if (req.file) { // Checking if req.file is not empty.
            file_url = req.file.location
        }else{
            file_url = "sad"
        }
        // var file_url = req.file.location
        updateDb = User.UpdateUserProfile(file_url,id)
        return Response.reply(res, result = {
            "imageUrl" : file_url
        }) 
     
    });
});

module.exports = router;