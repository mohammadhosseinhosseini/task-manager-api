const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");

const Task = require("../modles/task");

router.post("/tasks", auth, async (req, res) => {
  //const newTask = new Task(req.body);

  const newTask = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await newTask.save();
    res.status(201).send(newTask);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    res.status(200).send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.send(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) match.completed = req.query.completed === "true";
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1].toLowerCase() === "asc" ? 1 : -1;
  }
  try {
    const user = req.user;
    await user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.status(200).send(user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
