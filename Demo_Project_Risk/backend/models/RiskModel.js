const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Risk = sequelize.define('Risk', {
    risk_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    risk_category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hazards: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    risks: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    mitigation_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    pre_mitigation_risk_score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_mitigation_risk_score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    barriers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
});

module.exports =  Risk;