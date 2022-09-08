const DATABASE = require("../models");
const Project = DATABASE.projects;
const Op = DATABASE.Sequelize.Op;

exports.create = (req, res) => {
  const project = {
    code: req.body.code,
    name: req.body.name,
    type: req.body.type,
    status: req.body.status
  };
  Project.findOne({where: {[Op.or]: [{name: project.name}, {code: project.code}] }}).then(response => {
    if(response == null)
    {
      Project.create(project).then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the project"
        });
      });
    }else
    {
      res.send({
        message: "Duplicate Name or Code"
      });
    }
  });
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
  Project.findAll({})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials"
    });
  });
};

// Update a Project by the id (code) in the request
exports.update = (req, res) => {
  const code = req.params.code;
  Project.findOne({where: {name:req.body.name, code: {[Op.ne]: code}}}).then(response => {
    if(response == null)
    {
      Project.update(req.body, {where: {code: code}})
      .then(num => {
        console.log();
        if (num >=0)
        {
          res.send();
        }else
        {
          res.send({
            message: "Cannot update project"
          });
        }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project"
      });
    });
    }else
    {
      res.send({
        message: "Duplicate project name"
      });
    }
  })
  
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const code = req.params.code;
  console.log(code);
  Project.destroy({where: {code: code}})
  .then(num => {
    if(num == 1){
      res.send({
        message: "Project was deleted successfully!"
      });
    }else
    {
      res.send({
        message: "Cannot delete this project"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete this project"
    })
  });
};

// Find projects by Type
exports.findByNameAndType = (req, res) => {
  const type = req.params.type;
  const name = req.params.name;
  console.log(name);
  Project.findAll({where: {name:{[Op.like]: `%${name}%`}, type:type}})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials"
    });
  });
};

// Find projects by Name
exports.findByName = (req, res) => {
  const name = req.params.name;
  Project.findAll({where: {name:{[Op.like]: `%${name}%`}}})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials"
    });
  });
};

exports.findByType = (req, res) => {
  const type = req.params.type;
  Project.findAll({where: {type:type}})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials"
    });
  });
};
