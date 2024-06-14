const { Model, DataTypes, Op } = require("sequelize");

const { sequelize } = require("../util/db");

class User extends Model {
  async number_of_notes() {
    return (await this.getNotes()).length;
  }
  static async with_notes(limit) {
    return await User.findAll({
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("notes.id")), "note_count"],
        ],
      },
      include: [
        {
          model: Note,
          attributes: [],
        },
      ],
      group: ["user.id"],
      having: sequelize.literal(`COUNT(notes.id) > ${limit}`),
    });
  }

  //Since the models are basically js classes, we can extend them with our own functions
  //const jami = await User.findOne({ name: 'Jami Kousa'})
  //const cnt = await jami.number_of_notes()
  //console.log(`Jami has created ${cnt} notes`)
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user",
    defaultScope: {
      where: {
        disabled: false,
      },
    },
    scopes: {
      admin: {
        where: {
          admin: true,
        },
      },
      disabled: {
        where: {
          disabled: true,
        },
      },
    },
    name(value) {
      return {
        where: {
          name: {
            [Op.iLike]: value,
          },
        },
      };
    },
  }
);

//Scopes can be used in the following matter:

// Returns ll admins
//const adminUsers = await User.scope('admin').findAll()

// Returns all inactive users
//const disabledUsers = await User.scope('disabled').findAll()

// Returns users with the string jami in their name
//const jamiUsers = await User.scope({ method: ['name', '%jami%'] }).findAll()

// Returns all admins with the string jami in their name
//const jamiUsers = await User.scope('admin', { method: ['name', '%jami%'] }).findAll()

module.exports = User;
