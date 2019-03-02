const routes = (router) => {
  router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Population Management app'})
});
};

export default routes;