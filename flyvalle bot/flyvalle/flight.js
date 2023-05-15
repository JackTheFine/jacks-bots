const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("../db.js");
db.loadFromFile("./flyvalle bot/flyvalle/db.json");
if (!db.alreadyExists()) {
  db.set("flights", {});
  db.save();
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flight")
    .setDescription("Flight host commands (Host only)")
    .addSubcommand(subcommand =>
      subcommand.setName("create")
        .setDescription("Create flight")
        .addStringOption(option =>
          option.setName("host")
            .setDescription("Flight Host")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("time")
            .setDescription("Flight Time")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("date")
            .setDescription("Flight Date")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("departure")
            .setDescription("Departure Airport")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("arrival")
            .setDescription("Arrival Airport")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("gate")
            .setDescription("Gate Number")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("classes")
            .setDescription("Classes for the flight")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("aircraft")
            .setDescription("Aircraft to be used")
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName("edit")
        .setDescription("Edit flight by ID")
        .addStringOption(option =>
          option.setName("id")
            .setDescription("Flight ID")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("host")
            .setDescription("New Flight Host")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("time")
            .setDescription("New Flight Time")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("date")
            .setDescription("New Flight Date")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("departure")
            .setDescription("New Departure Airport")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("arrival")
            .setDescription("New Arrival Airport")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("gate")
            .setDescription("New Gate Number")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("classes")
            .setDescription("New Classes for the Flight")
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName("aircraft")
            .setDescription("New Aircraft to be used")
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName("delete")
        .setDescription("Delete Flight by ID")
        .addStringOption(option =>
          option.setName("id")
            .setDescription("Flight ID")
            .setRequired(true)
        )
    ),
  async execute(interaction, client1) {
    await interaction.deferReply({ ephemeral: true });
    if (interaction.user.tag == "Caleb.#4520") return interaction.editReply({ content: "Until further notice, you are banned from this command.", ephemeral: true })
    if (interaction.member.roles.cache.has("1039580833725562910") || interaction.member.roles.cache.has("1072562973270351892") || interaction.user.tag == "JackTheFine#0205") {
      switch (interaction.options._subcommand) {
        case "create":
          if (
            !interaction.options.getString("host") ||
            !interaction.options.getString("time") ||
            !interaction.options.getString("date") ||
            !interaction.options.getString("departure") ||
            !interaction.options.getString("arrival") ||
            !interaction.options.getString("gate") ||
            !interaction.options.getString("classes") ||
            !interaction.options.getString("aircraft")
          ) return interaction.editReply({ content: "Missing arguments." });

          var flights = db.get("flights");
          var id = Math.random().toString(36).substr(2, 9);
          if (flights[id]) return interaction.editReply({ content: "Foreseen error due to developer laziness. Please try again (very low chance of re-error).", ephemeral: true });

          flights[id] = {
            id,
            host: interaction.options.getString("host"),
            time: interaction.options.getString("time"),
            date: interaction.options.getString("date"),
            departure: interaction.options.getString("departure"),
            arrival: interaction.options.getString("arrival"),
            gate: interaction.options.getString("gate"),
            classes: interaction.options.getString("classes"),
            aircraft: interaction.options.getString("aircraft")
          }

          var reply = await client1.channels.cache.get(process.env.channel).send({ embeds: [generateEmbed(flights[id])] });
          flights[id].messageId = reply.id;

          db.set("flights", flights);
          db.save();

          interaction.editReply({ content: "Flight created. Flight ID: " + id, ephemeral: true });

          if (db.get("noFlightsMessageId")) {
            client1.channels.cache.get(process.env.channel).messages.fetch(db.get("noFlightsMessageId")).then(message => message.delete());
            db.set("noFlightsMessageId", null);
            db.save();
          }
          const b = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.tag}` })
            .setTitle("Flight Created")
            .setDescription(`${id}`)
          client1.channels.cache.get("1075871055949873313").send({ embeds: [b] })
          break;
        case "edit":
          if (
            !interaction.options.getString("id") ||
            !interaction.options.getString("host") ||
            !interaction.options.getString("time") ||
            !interaction.options.getString("date") ||
            !interaction.options.getString("departure") ||
            !interaction.options.getString("arrival") ||
            !interaction.options.getString("gate") ||
            !interaction.options.getString("classes") ||
            !interaction.options.getString("aircraft")
          ) return interaction.editReply({ content: "Missing arguments.", ephemeral: true });

          var flights = db.get("flights");
          var id = interaction.options.getString("id");
          if (!flights[id]) return interaction.editReply({ content: "Flight not found.", ephemeral: true });

          flights[id] = {
            id,
            host: interaction.options.getString("host"),
            time: interaction.options.getString("time"),
            date: interaction.options.getString("date"),
            departure: interaction.options.getString("departure"),
            arrival: interaction.options.getString("arrival"),
            gate: interaction.options.getString("gate"),
            classes: interaction.options.getString("classes"),
            aircraft: interaction.options.getString("aircraft"),
            messageId: flights[id].messageId
          }

          client1.channels.cache.get(process.env.channel).messages.fetch(flights[id].messageId).then(message => message.edit({ embeds: [generateEmbed(flights[id])] }));

          db.set("flights", flights);
          db.save();

          interaction.editReply({ content: "Flight edited.", ephemeral: true });
          const d = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.tag}` })
            .setTitle("Flight Edited")
            .setDescription(`${id}`)
          client1.channels.cache.get("1075871055949873313").send({ embeds: [d] })
          break;
        case "delete":
          if (
            !interaction.options.getString("id")
          ) return interaction.editReply({ content: "Missing arguments.", ephemeral: true });

          var flights = db.get("flights");
          var id = interaction.options.getString("id");
          if (!flights[id]) return interaction.editReply({ content: "Flight not found.", ephemeral: true });

          client1.channels.cache.get(process.env.channel).messages.fetch(flights[id].messageId).then(message => message.delete());
          delete flights[id];

          db.set("flights", flights);
          db.save();

          interaction.editReply({ content: "Flight deleted.", ephemeral: true });

          if (!Object.values(flights).length) {
            const a = new EmbedBuilder()
              .setColor("#0096FF")
              .setAuthor({ name: "Flight Manager" })
              .setTitle("<:fv:1056514422958477312> Flight Status")
              .setDescription("There are no current flights at this time, check back later for new flights. This message will update when a new flight is created in our systems.")
              .setFooter({ text: "Flight Manager | Last updated:" })
              .setTimestamp()
            var reply = await client1.channels.cache.get(process.env.channel).send({ embeds: [a] });
            db.set("noFlightsMessageId", reply.id);
            db.save();
          }
          const c = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.tag}` })
            .setTitle("Flight Deleted")
            .setDescription(`${id}`)
          client1.channels.cache.get("1075871055949873313").send({ embeds: [c] })
          break;
      }
    } else {
      interaction.editReply({ content: "Invalid Permissions", ephemeral: true })
      const d = new EmbedBuilder()
            .setAuthor({ name: "Invalid Permissions" })
            .setTitle(`${interaction.user.tag}`)
            .setDescription(`Attempted to create/edit/delete a flight.`)
          return client1.channels.cache.get("1075871055949873313").send({ embeds: [d] })
    }
  }
}

function generateEmbed(flight) {
  var embed = new EmbedBuilder()
    .setAuthor({ name: "Flight Manager" })
    .setTitle("<:fv:1056514422958477312> Flight Information")
    .setColor("#0096FF")
    .addFields(
      { name: `Host`, value: flight.host, inline: true },
      { name: "Time", value: flight.time, inline: true },
      { name: "Date", value: flight.date, inline: true },
      { name: "Departure", value: flight.departure, inline: true },
      { name: "Arrival", value: flight.arrival, inline: true },
      { name: "Gate", value: flight.gate, inline: true },
      { name: "Classes", value: flight.classes, inline: true },
      { name: "Aircraft", value: flight.aircraft, inline: true }
    )
    .setFooter({ text: "Flight ID: " + flight.id });
  return embed;
}

