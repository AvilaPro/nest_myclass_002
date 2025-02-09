import { Schema } from "mongoose";

export const UserSchema =  new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, required: true, enum:['admin', 'user']},
    photo: String,
    created_at: { type: Date, default: Date.now },
})