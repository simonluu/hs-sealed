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

	app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.put('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);

  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete('/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy);

  app.all('/api/todos/:todoId/items', (req, res) => 
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
};