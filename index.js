const db = require("./models");

async function main() {
  try {
    await db.sequelize.sync();
    console.log("Successfully run the function");
  } catch (err) {
    console.log("Error: ", err);
  }
}

main();
