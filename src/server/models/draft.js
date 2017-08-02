module.exports = (sequelize, DataTypes) => {
  const Draft = sequelize.define('Draft', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Draft.associate = (models) => {
    Draft.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }
  return Draft;
}