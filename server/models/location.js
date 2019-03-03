export default (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    malePopulation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    femalePopulation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    locality: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Citizen, {
      as: 'citizen',
      foreignKey: 'locationId'
    })
  };
  Location.createRules = () => ({
    name: 'required|min:2',
    malePopulation: ['required', 'min:1', 'regex:/^([+-]?[1-9]\\d*|0)$/'],
    femalePopulation: ['required', 'min:1', 'regex:/^([+-]?[1-9]\\d*|0)$/'],
    locality: 'required|min:2',
  });
  return Location;
};