const Event = require("../structures/Event");

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {});
	}

	run(oldRole, newRole) {
		// TODO
		return;
		console.log("old role:", oldRole);
		console.log("new role:", newRole);
	}
};
