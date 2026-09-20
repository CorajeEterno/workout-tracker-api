const { DataTypes } = require('sequelize');
const db = require('../config/db.js');

const Workout = db.define('Workout', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    scheduledAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    durationMinutes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'pending'
    }
}, {
    tableName: 'workouts',
    timestamps: true
});

module.exports = Workout;