const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	sequelize.define(
		"automod",
		{
			enabled: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			websiteWhitelist: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				defaultValue: [],
			},
			punishmentWebsite: {
				type: DataTypes.STRING,
			},
			inviteWhitelist: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				defaultValue: [],
			},
			punishmentInvites: {
				type: DataTypes.STRING,
			},
			wordBlacklist: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				defaultValue: [],
			},
			punishmentWords: {
				type: DataTypes.STRING,
			},
			limitMentions: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			punishmentMentions: {
				type: DataTypes.STRING,
			},
			limitMessages: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			punishmentMessages: {
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: false,
		},
	);
};
