import LocationController from '../controllers/location';
import CitizenController from '../controllers/citizen';

const routes = (router) => {
  router.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to Population Management app'
    });
  });
  /** POST api/v1/location/create - Create a new location */
  router.route('/location/create').post(LocationController.create);
  /** GET api/v1/location/all - Get all locations */
  router.route('/location/all').get(LocationController.getAllLocations);
  /** PUT api/v1/location/update/:id - Update a location */
  router.route('/location/update/:id').put(LocationController.updateLocation);
  /** DELETE api/v1/location/delete/:id - Delete a location */
  router.route('/location/delete/:id').delete(LocationController.deleteLocation);
  /** POST api/v1/citizen/create - Create a new citizen */
  router.route('/citizen/create').post(CitizenController.create);
};

export default routes;