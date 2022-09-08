module.exports = (sequelize, Sequelize) => {
  const demo = sequelize.define("project_demo", {
    code: {
      type: Sequelize.SMALLINT(5),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.SMALLINT(1),
      allowNull: false,
    }
  },
  { timestamps: false }
  );
  
  return demo;
};