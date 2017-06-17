module.exports = (sequelize, DataTypes) => {
  const Draft = sequelize.define('Draft', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Draft.associate = (models) => {
    Draft.belongsTo(models.User, {
      foreignKey: 'draftId',
      onDelete: 'CASCADE',
    });
  }
  return Draft;
}