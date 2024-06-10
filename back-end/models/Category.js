import mongoose from 'mongoose';
import Joi from 'joi';

// Category schema
const categorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true })

// Category Model
const Category = mongoose.model("Category", categorySchema);

// Validate create comment
const validateCreateCategory = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().required().label("title")
  })

  return schema.validate(obj);
}

export { Category, validateCreateCategory };