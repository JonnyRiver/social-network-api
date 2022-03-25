const { User, Thought } = require("../models");

const thoughtController = {
  // Get all thoughts
  gitAllThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__V",
      })
      .select("-__V")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Get one thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__V",
      })
      .select("-__V")
      .sort({ _id: -1 })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(400).json({ message: "No thought found with that ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
};
