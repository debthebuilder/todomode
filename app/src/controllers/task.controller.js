
const { task } = require("../models");

exports.create = (req, res) => {
    if (!req.body.task) {
      res.status(400).send({
        message: "Task can not be empty!",
      });
      return;
    }
  
    const data = {
      uid: req.body.uid,
      task: req.body.task,
      status: req.body.status,
      category: req.body.category,
      priority: req.body.priority,
      dueDate: req.body.date
    
    };
  
   task
      .create(data)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
};

exports.findAll = (req, res) => {
    const id = req.params.id;
    const condition = id ? { uid: id } : null;
  
    task
      .findAll({ where: condition, order: [["id", "DESC"]] })
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  };
  
  exports.findOne = (req, res) => {
    const id = req.params.id;
    
    task
      .findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "Task not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving task",
        });
      });
  };
  
  exports.update = (req, res) => {
    const id = req.params.id;
  
    task
      .update(req.body, {
        where: { id: id },
      })
      .then((num) => {
        if (num === 1) {
          res.send({
            message: "Task updated successful.",
          });
        } else {
          res.send({
            message: `Task update failed, please try again later.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating task",
        });
      });
  };
  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    task
      .destroy({
        where: { id: id },
      })
      .then((num) => {
        if (num === 1) {
          res.send({
            message: "Task deleted.",
          });
        } else {
          res.send({
            message: `Task not deleted. Please try again later.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error deleting task.",
        });
      });
  };