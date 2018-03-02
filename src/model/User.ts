export default (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		username: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		email_auth: {
			type: Sequelize.BOOLEAN,
			allowNull: false
		}
	});
	return User;
}

export interface UserInterface {
	name: string,
	username: string,
	email: string,
	password: string
}