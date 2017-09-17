const userController = require('../controllers').users;
const draftController = require('../controllers').drafts;
const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;

module.exports = (app) => {
  // Login API Calls
  app.post('/api/login', userController.get);

  // Signup API Calls
  app.post('/api/signup', userController.create);
  // Don't really need a get all users...
  app.get('/api/getall', userController.getAll);

  // User API Calls
  app.post('/api/create-draft', draftController.create);
  app.get('/api/drafts/:userId/:draftId', draftController.get);
  app.get('/api/drafts/:userId', draftController.getAll);
  app.patch('/api/drafts/update-cards/:userId/:draftId', draftController.updateCards);
  app.patch('/api/drafts/update-state/:userId/:draftId', draftController.updateState);
  app.patch('/api/drafts/subtract-amount/:userId/:draftId', draftController.subtractAmount);
  app.patch('/api/drafts/add-amount/:userId/:draftId', draftController.addAmount);
  app.delete('/api/drafts/:userId/:draftId', draftController.destroy);

  // app.all('/api/drafts/:userId', (req, res) =>
  //   res.status(405).send({
  //     message: 'Method Not Allowed',
  //   }));
};