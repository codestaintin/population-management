export default (sequelize, DataTypes) => {
  const Citizen = sequelize.define('Citizen', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 2,
          msg: 'Citizen name cannot be less than 2 characters'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Citizen.associate = function(models) {
    // associations can be defined here
    Citizen.belongsTo(models.Location, {
      foreignKey: 'locationId'
    })
  };
  Citizen.createRules = () => ({
    name: 'min:2',
    gender: 'regex:/^male$|^female$|^M|^m|^F|^f/'
  });
  return Citizen;
};