import Validator from 'validatorjs';
import db from '../models';

const { Location } = db;
/**
 * Locations class
 */
export default class Locations {
  /**
 * Create Message
 * @param req - HTTP Request
 * @param res - HTTP Response
 * @returns {object} - Location object
 */
  static async create(req, res) {
    const { body } = req;
    const validator = new Validator(body, Location.createRules());
    if (validator.passes()) {
      try {
        const [location, created] = await Location.findOrCreate({
          where: { name: body.name },
          defaults: {
            name: body.name,
            malePopulation: body.malePopulation,
            femalePopulation: body.femalePopulation,
            locality: body.locality
          }
        });
        if (created) {
          return res.status(201).json({
            message: 'Location created successfully',
            location
          });
        }
        return res.status(409).json({
          message: 'Location already exists, will you like to edit it?'
        });
      } catch (error) {
        return res.status(500).json({
          message: 'An error occurred during this operation',
          error
        });
      }
    }
    return res.status(400).json({
      message: 'A validation error occurred',
      errors: validator.errors.all()
    });
  }
/**
 * Create Message
 * @param req - HTTP Request
 * @param res - HTTP Response
 * @returns {object} - Locations object
 */
  static async getAllLocations(req, res) {
    const allLocations = await Location.findAll();
    if (allLocations.length === 0) {
      return res.status(200).json({
        message: 'No location was fetched at this moment'
      });
    }
    const locationDetails = allLocations.map(location => {
      const { name, malePopulation, femalePopulation, locality } = location.dataValues;
      const totalPopulation = malePopulation + femalePopulation;

      return {
        name,
        malePopulation,
        femalePopulation,
        totalPopulation,
        locality
      };
    });
    return res.status(200).json({
      message: 'All Locations',
      locationDetails
    })
  }
/**
 * Create Message
 * @param req - HTTP Request
 * @param res - HTTP Response
 * @returns {object} - updated object
 */
  static async updateLocation(req, res) {
    const { body, params: { id } } = req;
    const { name, malePopulation, femalePopulation, locality } = body;
    const validator = new Validator(body, Location.createRules());
    if (validator.passes()) {
      try {
        const foundLocation = await Location.findOne({
          where: { id }
        });
        if (!foundLocation) {
          return res.status(404).json({
            message: 'Location not found'
          });
        }
        foundLocation.update({
          name,
          malePopulation,
          femalePopulation,
          locality
        });
        return res.status(200).json({
          message: 'Location successfully updated',
          foundLocation
        });
      } catch (error) {
        return res.status(500).json({
          message: 'An error occurred during this operation',
          error
        });
      }
    }
    return res.status(400).json({
      message: 'A validation error occurred',
      errors: validator.errors.all()
    });
  }
/**
 * Create Message
 * @param req - HTTP Request
 * @param res - HTTP Response
 * @returns {object} - Message object
 */
  static async deleteLocation(req, res) {
    const { params: { id } } = req;
    try {
      const foundLocation = await Location.findOne({
        where: { id }
      });
      if (!foundLocation) {
        return res.status(404).json({
          message: 'Location not found'
        });
      }
      await foundLocation.destroy();
      return res.status(200).json({
        message: 'Location successfully deleted'
      })
    } catch (error) {
      return res.status(500).json({
        message: 'An error occurred during this operation'
      });
    }
  }
}