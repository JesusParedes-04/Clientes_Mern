import mongoose from "mongoose";

const clientSchema = mongoose.Schema({

Name: {
    type: String,
    trim: true,
    required: true
},

Surname: {
    type: String,
    trim: true,
    required: true
},

Email: {

    type: String,
    trim: true,
    required: true

} ,

Phone: {
    type: String,
    trim: true,
    required: true

},

Status: {
    type: String,
    trim: true,
    required: true

}


})

const Client = mongoose.model('cliente', clientSchema);

export default Client;
