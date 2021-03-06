var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var postSchema = new Schema({
   // _id:String,
    author:String,
    title:String,
    summary:String,
    body:String,
    bgColor:String,
    iframeUrl:String,
    category:String,
    starred: [String],
    tags:[{
        type:String,
        index:true
    }],
    thumbnail:{data:{
        type: Schema.Types.Mixed, default: {}
    }},
    gif:{data:{
        type: Schema.Types.Mixed, default: {}
    }},
    files:{data:[]},
    comments:[
        {
            postId:String,
            name:String,
            body:String,
        }
    ],
    postDate: String
   
},{ minimize: false });
postSchema.plugin(mongoosePaginate);
postSchema.index({title: 'text', summary: 'text',tags:1});
module.exports = mongoose.model('post',postSchema);