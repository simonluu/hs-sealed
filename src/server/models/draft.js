module.exports = (sequelize, DataTypes) => {
  const Draft = sequelize.define('Draft', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    packs: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    cards: {
      type: DataTypes.ARRAY(DataTypes.JSON),
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