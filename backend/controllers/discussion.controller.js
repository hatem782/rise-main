const Discussion = require("../models/disccusion");
const mongoose = require("mongoose");

async function createDiscussion(req, res) {
  try {
    const userId = mongoose.Types.ObjectId(req.query.user_id);
    const companyId = mongoose.Types.ObjectId(req.query.company_id);

    const oldDiscussion = await Discussion.findOne({
      user: req.body.userId,
      company: req.body.companyId,
    });
    if (oldDiscussion) {
      return res.status(200).json(oldDiscussion);
    }

    const newDiscussion = new Discussion({
      user: req.body.userId,
      company: req.body.companyId,
      messages: [],
    });

    const savedDiscussion = await newDiscussion.save();
    return res.status(200).json(savedDiscussion);
  } catch (error) {
    // Handle error
    console.log(error);
    return res.status(404).json({ msg: "Failed to create Disccusion" });

    throw error;
  }
}

async function getDiscussion(req, res) {
  try {
    const discussion = await Discussion.findById(
      req.params.discussionId
    ).populate("user company admin");
    return res.status(200).json({ discussion });
  } catch (error) {
    // Handle error
    console.error(error);
    return res.status(404).json({ msg: "Failed to get disccusion" });
  }
}

async function getMyDiscussion(req, res) {
  try {
    let { _id } = req.user;
    // get discution as
    const discussions = await Discussion.find({
      $or: [{ user: _id }, { company: _id }],
    })
      .populate("user")
      .populate("company");
    return res.status(200).json(discussions);
  } catch (error) {
    // Handle error
    console.error(error);
    return res.status(404).json({ msg: "Failed to get disccusion" });
  }
}

async function deleteDiscussion(req, res) {
  try {
    const deletedDiscussion = await Discussion.findByIdAndDelete(
      req.discussionId
    );
    return res.status(200).json({ msg: "Disccusion deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ msg: "Failed to delete Disccusion" });
  }
}

module.exports = {
  createDiscussion,
  getDiscussion,
  getMyDiscussion,
  deleteDiscussion,
};
