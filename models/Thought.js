const { Schema, model, Types } = require("mongoose");
const moment = require("moment");
// const { Thought } = require(".");

const ReactionsSchema = new Schema(
  {
    reactionsId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionsBody: {
      type: String,
      required: false,
      maxlength: 280,
    },
    username: {
      type: String,
      require: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlegth: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: false,
    },
    reactions: [ReactionsSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
