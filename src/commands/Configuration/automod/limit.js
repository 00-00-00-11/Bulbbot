const { changeLimit } = require("../../../utils/AutoModUtils");
const { NonDigits } = require("../../../utils/Regex");

module.exports = async (client, message, args) => {
	const part = args[1];
	let limit = args[2];

	if (!part)
		return message.channel.send(
			await client.bulbutils.translate("event_message_args_missing_list", {
				arg: "part:string",
				arg_expected: 3,
				arg_provided: 1,
				usage: "`mentions` or `messages`",
			}),
		);

	if (!limit)
		return message.channel.send(
			await client.bulbutils.translate("event_message_args_missing", {
				arg: "limit:int",
				arg_expected: 3,
				arg_provided: 2,
				usage: "!automod limit <part> <limit>",
			}),
		);

	if (!["mentions", "messages"].includes(part.toLowerCase()))
		return message.channel.send(
			await client.bulbutils.translate("event_message_args_unexpected_list", {
				arg: part,
				arg_expected: "part:string",
				usage: "`mentions` or `messages`",
			}),
		);

	limit = parseInt(limit.replace(NonDigits, ""));
	if (isNaN(limit)) return message.channel.send(await client.bulbutils.translate("automod_non_number", { limit: args[2] }));
	if (limit <= 0) return message.channel.send(await client.bulbutils.translate("automod_less_than_zero", { limit }));

	changeLimit(message.guild.id, part.toLowerCase(), limit);

	message.channel.send(await client.bulbutils.translate("automod_updated_limit", { part, limit }));
};
