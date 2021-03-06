module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Drafts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      format: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      packs: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: false,
      },
      cards: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
    }),
  down: (queryInterface /*, Sequelize */) =>
    queryInterface.dropTable('Drafts'),
}