const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const variants = new Schema({
  option_title: String, //?
  //supplier: [{ type: Schema.Types.ObjectId, ref: "suppliers" }],
  supplier: Object,
  supplier_price: String,
  price_with_tax: String,
  price_without_tax: String,
  sku: String,
  price: String, //?
  images: String,
  discounter_price: String, //?
  discounted: {
    type: Boolean,
    default: false,
  },
  barcode: String,
  quantity: String, //?
  brand: String,
  color: String,
  size: String,
  active: {
    type: Boolean,
    default: false,
  },
  created_at: Date,
  updated_at: Date,
});
const product_tags = new Schema({
  tag_label: String,
  created_at: Date,
  updated_at: Date,
});
const ProductSchema = new Schema({
  product_name: String,
  product_description: String,
  //product_type: [{ type: Schema.Types.ObjectId, ref: "product_types" }],
  product_type: Object,
  product_tags: [ product_tags ],
  active: {
    type: Boolean,
    default: false,
  },
  variants: [ variants ], //should always have atleast one variant
  created_at: Date,
  updated_at: Date,
});
product_tags.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
product_tags.pre("save", function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});
variants.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
variants.pre("save", function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});
ProductSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
ProductSchema.pre("save", function (next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});
mongoose.model("products", ProductSchema);