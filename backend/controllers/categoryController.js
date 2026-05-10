const slugify = require("slugify");
const categorySchema = require("../schema/categorySchema");
const CreateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    //validation
    if (!name) {
      return res.status(400).json({ msg: "Name Required" });
    }

    //existing
    const existing = await categorySchema.findOne({ name });

    if (existing) {
      return res.status(400).json({ msg: "Category already exists" });
    }

    const category = await categorySchema.create({
      name,
      slug: slugify(name),
    });

    return res.status(200).json(category);
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};

const UpdateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const { id } = req.params;

    const category = await categorySchema.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true },
    );

    return res.status(200).json(category);
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};

const getallCategories = async (req, res) => {
  try {
    const category = await categorySchema.find({});

    return res.status(200).json(category);
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const category = await categorySchema.findOne({ slug: req.params.slug });

    return res.status(200).json(category);
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};

const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categorySchema.findByIdAndDelete(id);

    return res.status(200).json(category);
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};

module.exports = {
  CreateCategory,
  UpdateCategory,
  getallCategories,
  getSingleCategory,
  DeleteCategory
};
