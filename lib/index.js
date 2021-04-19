"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.poll = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
async function poll(message, args, separator, embedColor) {
    const findSep = args.find(char => char.includes(separator));
    if (findSep === undefined) {
        const question = args.join(' ');
        if (!question) {
            return message.channel.send('Please enter a question');
        }
        message.delete();
        const embed = new discord_js_1.default.MessageEmbed().setTitle('📊 ' + question).setColor(embedColor);
        await message.channel.send({ embed }).then(msg => {
            msg.react('👍');
            msg.react('👎');
        });
    }
    else {
        message.delete();
        const embed = new discord_js_1.default.MessageEmbed();
        const options = [];
        let j = 0;
        for (let i = 0; i < args.length; i++) {
            if (args[i] === separator) {
                args.splice(i, 1);
                const question = args.splice(0, i);
                embed.setTitle('📊 ' + question.join(' '));
                break;
            }
        }
        for (let i = 0; i < args.length; i++) {
            if (args[i] === separator) {
                args.splice(i, 1);
                options[j] = args.splice(0, i);
                j++;
                i = 0;
            }
        }
        const alphabet = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱',
            '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];
        const arr = [];
        options[j] = args;
        if (options.length > alphabet.length) {
            return await message.channel.send('Please don\'t input more than 26 options.').then(sent => {
                setTimeout(() => {
                    sent.delete();
                }, 2000);
            });
        }
        let count = 0;
        options.forEach(option => {
            arr.push(alphabet[count] + ' ' + option.join(' '));
            count++;
        });
        embed
            .setDescription(arr.join('\n\n'))
            .setColor(embedColor);
        await message.channel.send({ embed }).then(msg => {
            for (let i = 0; i < options.length; i++) {
                msg.react(alphabet[i]);
            }
        });
    }
}
exports.poll = poll;
//# sourceMappingURL=index.js.map