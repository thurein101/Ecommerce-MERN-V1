const { default: slugify } = require("slugify");
const productSchema = require("../schema/productSchema");
const fs = require("fs");
const { estimatedDocumentCount } = require("../schema/userSchema");
const categorySchema = require("../schema/categorySchema");

const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(400).json({ err: "Name is required" });
      case !description:
        return res.status(400).json({ err: "Description is required" });
      case !price:
        return res.status(400).json({ err: "Price is required" });
      case !category:
        return res.status(400).json({ err: "Category is required" });
      case !quantity:
        return res.status(400).json({ err: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(400).json({ err: "Image should be less than 1MB" });
    }
    const product = new productSchema({
      ...req.fields,
      slug: slugify(name),
    });

    if (photo && photo.path) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.mimetype;
    }
    await product.save();

    return res.status(200).json(product);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    const product = await productSchema
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    return res.status(200).json(product);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const getSingleProductsController = async (req, res) => {
  try {
    const product = await productSchema
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    return res.status(200).json(product);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const getPhotoController = async (req, res) => {
  try {
    const product = await productSchema
      .findById(req.params.pid)
      .select("photo");

    if (!product?.photo?.data) {
      return res.status(404).send("No photo");
    }

    res.set("Content-Type", product.photo.contentType);
    res.set("Cache-Control", "no-store");
    res.send(product.photo.data);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const product = await productSchema
      .findByIdAndDelete(req.params.pid)
      .select("-photo");

    return res.status(200).json(product);
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
};

const updateProductController = async (req, res) => {
  try {
    const fields = req.fields;
    const files = req.files;

    const { name, description, price, category, quantity, shipping } = fields;
    const { photo } = files;

    if (photo && photo.size > 1000000) {
      return res.status(400).json({ err: "Image should be less than 1MB" });
    }

    const product = await productSchema.findByIdAndUpdate(
      req.params.pid,
      {
        ...fields,
        slug: slugify(name),
      },
      { new: true },
    );

    if (photo && photo.path) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.mimetype;
      // 🔥 VERY IMPORTANT
    }
    await product.save();
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const filterProduct = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };

    const product = await productSchema.find(args);
    return res.status(200).json(product);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const countProduct = async (req, res) => {
  try {
    const total = await productSchema.find({}).estimatedDocumentCount();

    return res.status(200).json(total);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};
const productList = async (req, res) => {
  try {
    const perPage = 6;
    const page = Number(req.params.page) || 1;

    const products = await productSchema
      .find({})
      .select("-photo")
      .sort({ createdAt: -1 }) // ✅ correct place
      .skip((page - 1) * perPage)
      .limit(perPage);

    return res.status(200).json(products);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

const searchFilterController = async (req, res) => {
  try {
    const { keyword } = req.params;

    const result = await productSchema
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

const similarProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const product = await productSchema
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category")
      .lean();
    return res.status(200).json(product);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const categoryList = async (req, res) => {
  try {
    const category = await categorySchema.findOne({ slug: req.params.slug });
    const product = await productSchema.find({ category }).populate("category");
    return res.status(200).json({ category, product });
  } catch (e) {
    return res.status(200).json({ msg: e.message });
  }
};

module.exports = {
  createProductController,
  getAllProductsController,
  getSingleProductsController,
  getPhotoController,
  deleteProductController,
  updateProductController,
  filterProduct,
  countProduct,
  productList,
  searchFilterController,
  similarProduct,
  categoryList
};
