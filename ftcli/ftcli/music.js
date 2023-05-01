const discordaudio = require("discordaudio");
const { ComponentType, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ytdl = require("ytdl-core");

async function getVideoDetails(id, cookie) {
    var videoInfo;
    if (cookie) {
        try {
            videoInfo = await ytdl.getInfo(id, { requestOptions: { headers: { cookie } } });
        } catch (e) {
            return { success: false, message: "invalid_cookie", code: 403 };
        }
    } else {
        try {
            videoInfo = await ytdl.getInfo(id);
        } catch (e) {
            if (e.statusCode == 410) return { success: false, message: "cookies_required", code: 410 };
            return { success: false, e };
        }
    }

    var hd;
    try { hd = videoInfo.formats.find(x => x.itag == 22).url; } catch (e) { }
    var sd = videoInfo.formats.find(x => x.itag == 18).url;
    var audio = videoInfo.formats.find(x => x.itag == 140).url;
    var formats = { hd, sd, audio };

    return { success: true, formats: formats, info: { author: videoInfo.videoDetails.author.name, title: videoInfo.videoDetails.title, description: videoInfo.videoDetails.description, length: videoInfo.videoDetails.lengthSeconds, thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg` } };
}

const connections = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("Enter a YouTube video link (not id) to stream it to an audio channel!")
        .addSubcommand(subcommand =>
            subcommand.setName("endloop")
                .setDescription("Stop the loop, if there is one (whether song or queue)")
        )
        .addSubcommand(subcommand =>
            subcommand.setName("loop")
                .setDescription("Loop the song that is now playing")
        )
        .addSubcommand(subcommand =>
            subcommand.setName("loopqueue")
                .setDescription("Loop the current queue (queue is still editable during loop)")
        )
        .addSubcommand(subcommand =>
            subcommand.setName("play")
                .setDescription("Stream a song to the voice channel you are in")
                .addStringOption(option =>
                    option.setName("song")
                        .setDescription("The YouTube Music URL (full, not just the id) of the song you want to stream.")
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("pause")
                .setDescription("Pause the song currently playing")
        )
        .addSubcommand(subcommand =>
            subcommand.setName("resume")
                .setDescription("Resume a paused song")
        )
        /*.addSubcommand(subcommand =>
            subcommand.setName("skip")
                .setDescription("Advance to the next song in the queue")
        )*/
        .addSubcommand(subcommand =>
            subcommand.setName("stop")
                .setDescription("Cease. Desisit. Halt.")
        )
        .addSubcommand(subcommand =>
            subcommand.setName("queue")
                .setDescription("View all songs in the queue")
        )
        .addSubcommand(subcommand =>
            subcommand.setName("volume")
                .setDescription("View or change the volume in your current voice channel")
                .addNumberOption(option =>
                    option.setName("new")
                        .setDescription("The new volume")
                        .setMinValue(1)
                        .setMaxValue(10)
                        .addChoices(
                            { name: "1", value: 1 },
                            { name: "2", value: 2 },
                            { name: "3", value: 3 },
                            { name: "4", value: 4 },
                            { name: "5", value: 5 },
                            { name: "6", value: 6 },
                            { name: "7", value: 7 },
                            { name: "8", value: 8 },
                            { name: "9", value: 9 },
                            { name: "10", value: 10 }
                        )
                        .setRequired(true)
                )
        ),

    async execute(interaction, client, options) {
        await interaction.deferReply();

        const vc = interaction.member.voice.channel;

        if (!vc) return await interaction.editReply("You are not in a voice channel.");

        switch (interaction.options._subcommand) {
            case "alias":
                break;
            case "endloop":
                var audioManager = connections.get(vc);
                if (!audioManager) return await interaction.editReply("I'm not playing anything in the voice channel you're in.");

                audioManager.loop(vc, audioManager.looptypes.off);

                await interaction.editReply("Stopped loop");

                break;
            case "loop":
                var audioManager = connections.get(vc);
                if (!audioManager) return await interaction.editReply("I'm not playing anything in the voice channel you're in.");

                audioManager.loop(vc, audioManager.looptypes.loop);

                var playing = (await audioManager.queue(vc))[0].title;
                await interaction.editReply(`Looping "${playing}"`);

                break;
            case "loopqueue":
                var audioManager = connections.get(vc);
                if (!audioManager) return await interaction.editReply("I'm not playing anything in the voice channel you're in.");

                audioManager.loop(vc, audioManager.looptypes.off);

                await interaction.editReply("Looping queue");

                break;
            case "play":
                if (!ytdl.validateURL(options.find(x => x.name == "song").value)) return await interaction.editReply("The song submitted does not exist.");

                var id = ytdl.getVideoID(options.find(x => x.name == "song").value);

                const songInfo = (await getVideoDetails(id)).info;
                if (!songInfo) return await interaction.editReply("This video is private or age/region restricted.");

                var audioManager = connections.get(vc) || new discordaudio.AudioManager();

                if (connections.get(vc) && audioManager.queue(vc).find(x => x.url == options.find(x => x.name == "song").value)) return await interaction.editReply("The song submitted is already in the queue or is playing.");

                const manager = await audioManager.play(vc, options.find(x => x.name == "song").value, {
                    autoleave: true,
                    quality: "high"
                });

                connections.set(vc, audioManager);

                audioManager.on("end", vc => connections.delete(vc));

                if (!manager) await interaction.editReply(`Playing "${songInfo.title}" in :loud_sound: ${client.channels.cache.get(vc.id).name}`)
                else await interaction.editReply(`Added "${songInfo.title}" to queue`);

                break;
            case "pause":
                var audioManager = connections.get(vc);
                if (!audioManager) return await interaction.editReply("I'm not playing anything in the voice channel you're in.");

                audioManager.pause(vc);

                var playing = (await audioManager.queue(vc))[0].title;
                await interaction.editReply(`Paused "${playing}"`);

                break;
            case "resume":
                var audioManager = connections.get(vc);
                if (!audioManager) return await interaction.editReply("I'm not playing anything in the voice channel you're in.");

                audioManager.resume(vc);

                var playing = (await audioManager.queue(vc))[0].title;
                await interaction.editReply(`Resumed "${playing}"`);

                break;
            case "skip":
                var audioManager = connections.get(vc);
                if (!audioManager) return await interaction.editReply("I'm not playing anything in the voice channel you're in.");

                var playing = (await audioManager.queue(vc))[0].title;

                await audioManager.skip(vc);

                await interaction.editReply(`Skipped "${playing}"`);

                break;
            case "stop":
                var audioManager = connections.get(vc);
                if (!audioManager) return await interaction.editReply("I'm not playing anything in the voice channel you're in.");

                await audioManager.stop(vc);
                await interaction.editReply("Stopped");

                connections.delete(vc);
                break;
            case "queue":
                var audioManager = connections.get(vc);
                if (!audioManager) return await interaction.editReply("I'm not playing anything in the voice channel you're in.");

                async function generateEmbed(selection = 0, ended) {
                    const queue = audioManager.queue(vc);

                    const queueEmbed = new MessageEmbed()
                        .setTitle("Queue");

                    var description = "";
                    queue.forEach((x, i) => description += `${(i == selection) ? "**" : ""}${i + 1}${(i == selection) ? "**" : ""} - [${x.title}](${x.url})${i == 0 ? " - Now Playing" : ""}\n`);
                    queueEmbed.setDescription(description);

                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId("prev")
                                .setEmoji({ id: "1056796875715514418" })
                                .setStyle(1)
                                .setDisabled(ended || selection == 0),
                            new MessageButton()
                                .setCustomId("next")
                                .setEmoji({ id: "1056796876680200252" })
                                .setStyle(1)
                                .setDisabled(ended || selection == queue.length - 1),
                            new MessageButton()
                                .setCustomId("remove")
                                .setEmoji({ id: "1056796716315197541" })
                                .setStyle(4)
                                .setDisabled(ended || selection == 0),
                            new MessageButton()
                                .setCustomId("end")
                                .setLabel("End Interaction")
                                .setStyle(4)
                                .setDisabled(ended || false),
                        )

                    return { components: [row], embeds: [queueEmbed] };
                }

                await interaction.editReply(await generateEmbed());

                var selection = 0;

                (async function updateEmbed() {
                    try {
                        const buttonInteraction = (await interaction.channel.awaitMessageComponent({ filter: x => x.message.interaction.id == interaction.id, componentType: "BUTTON", time: 10000 }));

                        const btn = buttonInteraction.customId;

                        switch (btn) {
                            case "end":
                                await buttonInteraction.update(await generateEmbed(selection, true));
                                break;
                            case "remove":
                                await audioManager.deletequeue(vc, audioManager.queue(vc)[selection].url);
                                if (selection > audioManager.queue(vc).length - 1) selection = audioManager.queue(vc).length - 1;
                                await buttonInteraction.update(await generateEmbed(selection));
                                return updateEmbed();
                            case "next":
                                selection++;
                                await buttonInteraction.update(await generateEmbed(selection));
                                return updateEmbed();
                            case "prev":
                                selection--;
                                await buttonInteraction.update(await generateEmbed(selection));
                                return updateEmbed();
                        }
                    } catch (err) {
                        await interaction.editReply(await generateEmbed(selection, true));
                        await interaction.followUp({ components: [], content: "Interaction ended due to inactivity", embeds: [], ephemeral: true })
                    }
                })();

                break;
            case "volume":
                var audioManager = connections.get(vc);
                if (!audioManager) return await interaction.editReply("I'm not playing anything in the voice channel you're in.");

                interaction.editReply(`Changed volume to :loud_sound: ${options.find(x => x.name == "new").value}`);
                audioManager.volume(vc, options.find(x => x.name == "new").value);
                break;
        }
    }
}