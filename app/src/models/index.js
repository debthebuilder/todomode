const {Sequelize, DataTypes} = require("sequelize");
const db = require("../configs/db.config");

const sequelize = new Sequelize(
    db.db, 
    db.user, 
    db.password, {
    host: db.host,
    dialect: 'mysql',
    dialectOptions: {
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    }
});

const sq = {};
const User = require("./user/index")(sequelize, DataTypes);
const Task = require("./tasks/index")(sequelize, DataTypes);

User.hasMany(Task, { foreignKey: "uid", sourceKey: "id" });
Task.belongsTo(User, { foreignKey: "uid", sourceKey: "id" });

sq.sequelize = sequelize;
sq.Sequelize = Sequelize;
sq.user = User;
sq.task = Task;

module.exports = sq;