const Command = require("../../structures/command")
module.exports = class BlackListCommand extends Command {
	constructor(client) {
		super(client, {
			name: "blacklist",
			category: "Developers",
			aliases: ["listanegra"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: true,
			hidden: true,
		})
	}
	async execute({message, args, server}, t) {
		let user = await this.client.database.Users.findById(args[1])
		if (!user || user === null) return message.chinoReply("error", "usuário não encontrado, tente informar o ID da próxima vez.")
		switch(args[0]) {
			case "add":
			user.blacklist = true
			user.blacklistReason = args.slice(2).join(" ")
			user.save()

			message.chinoReply("success", "usuário banido com sucesso.")
			break;
			case "remove":
			user.blacklist = false
			user.blacklistReason = null
			user.save()
			
			message.chinoReply("success", "usuário desbanido com sucesso.")
			break;
			case "view":
			let msg = `== USER BANNED INFO ==\n\n• User :: ${this.client.users.get(user._id).tag} - (${this.client.users.get(user._id).id})\n• Banned :: ${user.blacklist}\n• Reason :: ${user.blacklistreason}`
			message.channel.send(msg, {code: "asciidoc"})
			break;
			default:
			message.chinoReply("error", "você precisa escolher entre `add`, `remove`, `view`")
		}
	}
}