const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({ });
UserSchema.plugin(passportLocalMongoose);
mongoose.model('User', UserSchema);

const CommentSchema = new mongoose.Schema({
    desc: {type: String, required: true},
    user: {type: String, required: true}, 
    time: {type: String }
});

const TopicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    comments: [CommentSchema],
    user: {type: String, required: true}, 
    time: {type: String }
});
TopicSchema.index({title: 'text', desc: 'text'});
TopicSchema.plugin(URLSlugs('title'));
mongoose.model("Comments", CommentSchema);
mongoose.model("Topic", TopicSchema);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
    dbconf = 'mongodb://localhost/mh4160l';
}

mongoose.connect(dbconf);