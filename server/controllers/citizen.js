import Validator from 'validatorjs';
import db from '../models';

const { Citizen } = db;

/**
 * Citizen class
 */
export default class Citizens {
/**
 * Create Message
 * @param req - HTTP Request
 * @param res - HTTP Response
 * @returns {object} - Citizen object
 */
  static async create(req, res) {
    const { body } = req;
    const validator = new Validator(body, Citizen.createRules());
    if (validator.passes()) {
      try {
        const newCitizen = await Citizen.create({
          locationId: req.body.locationId,
          name: req.body.name,
          gender: req.body.gender
        });
        return res.status(201).json({
          message: 'Citizen created',
          newCitizen
        })
      } catch(error) {
        return res.status(500).json({
          message: 'An error occurred during this operation',
          error
        })
      }
    }
    return res.status(400).json({
      message: 'A validation error occurred',
      errors: validator.errors.all()
    });
  }
}