const Command = require("../../structures/Command");
const { Kick } = require("../../utils/moderation/actions");
const { NonDigits } = require("../../utils/Regex");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Kicks a user from the guild",
			category: "Moderation",
			usage: "!kick <member> [reason]",
			examples: ["kick 190160914765316096", "kick 190160914765316096 rude user", "kick @mrphilip#0001 rude user"],
			argList: ["member:Member"],
			minArgs: 1,
			maxArgs: -1,
			clearance: 50,
			userPerms: ["KICK_MEMBERS"],
			clientPerms: ["KICK_MEMBERS"],
		});
	}

	async run(message, args) {
		const targetId = args[0].replace(NonDigits, "");
		let target = message.guild.member(targetId);
		let reason = args.slice(1).join(" ");
		let infId = null;

		if (await this.client.bulbutils.ResolveUserHandle(message, await this.client.bulbutils.CheckUser(message, target), target.user)) return

		if (!reason) reason = await this.client.bulbutils.translate("global_no_reason");
		if (!target) return message.channel.send(await this.client.bulbutils.translate("global_user_not_found"));

		if (!target.kickable) {
			return message.channel.send(
				await this.client.bulbutils.translate("kick_fail", {
					target_tag: target.user.tag,
					target_id: target.user.id,
				}),
			);
		}

		infId = await Kick(
			this.client,
			message.guild,
			target.user,
			message.author,
			await this.client.bulbutils.translate("global_mod_action_log", {
				action: "Kicked",
				moderator_tag: message.author.tag,
				moderator_id: message.author.id,
				target_tag: target.user.tag,
				target_id: target.user.id,
				reason,
			}),
			reason,
		);

		return message.channel.send(
			await this.client.bulbutils.translate("kick_success", {
				target_tag: target.user.tag,
				target_id: target.user.id,
				reason,
				infractionId: infId,
			}),
		);
	}
};
