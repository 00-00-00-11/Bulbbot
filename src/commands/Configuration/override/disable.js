const { DisableCommand } = require("../../../utils/clearance/commands/CommandOverrideUtils");

module.exports = async (client, message, args) => {
	const command = args[1];
	if (!command) return message.channel.send(await client.bulbutils.translate("override_disable_missing_command"));
	const cTemp = client.commands.get(command.toLowerCase()) || client.commands.get(client.aliases.get(command.toLowerCase()));
	if (cTemp === undefined) return message.channel.send(await client.bulbutils.translate("override_disable_invalid_command", { command }));

	await DisableCommand(message.guild.id, cTemp);

	message.channel.send(await client.bulbutils.translate("override_disable_success", { command }));
};
