"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pets",
      [
        {
          name: "Annie",
          breed: "Bull Terrier",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Berkely",
          breed: "Bug",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Pets", null, {});
  },
};
