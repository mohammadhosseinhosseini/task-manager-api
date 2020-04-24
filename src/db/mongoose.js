const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// const me = new User({
//   name: "hossein",
//   age: 2,
//   email: "s@q.dd",
//   password: "bjhjhj"
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// const Task = mongoose.model("Task", {
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// });

// const newTask = new Task({
//   description: "Clean the room",
//   completed: true
// });

// newTask
//   .save()
//   .then(() => {
//     console.log(newTask);
//   })
//   .catch(error => {
//     console.log(error);
//   });
