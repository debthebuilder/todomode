const Task = (sequelize, DataTypes) => {
    return sequelize.define('Task', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
      },
      uid: {
        type: DataTypes.INTEGER,
      },
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      important: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dueDate: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
}

module.exports = Task;