"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("role_permissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      permission: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

    // add the all the constraints here for this table
    await queryInterface.addConstraint("role_permissions", {
      type: "foreign key",
      fields: ["role"],
      name: "fk_role_permissions__role",
      references: {
        table: "roles",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
    await queryInterface.addConstraint("role_permissions", {
      type: "foreign key",
      fields: ["permission"],
      name: "fk_role_permissions__permission",
      references: {
        table: "permissions",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("role_permissions");
  },
};
