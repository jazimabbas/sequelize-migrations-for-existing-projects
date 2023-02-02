const fs = require("fs/promises");
const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
// change the path of configs folder if you want ...
const { production } = require("../config/config.json");

const sequelize = new Sequelize({ ...production });

// change the path of migrations folder if you want ...
const Migrations_DirPath = __dirname + "/../migrations";
const Migration_Tablename = "SequelizeMeta";

async function run() {
  try {
    const migrationFiles = await getAllMigrationFiles();
    console.log("migration files: ", migrationFiles);
    await createSequelizeMigrationTable();
    await insertMigrationEntriesToTable(migrationFiles);
  } catch (err) {
    console.log("Error: ", err);
  }
}

async function getAllMigrationFiles() {
  const migrationFiles = await fs.readdir(Migrations_DirPath);
  if (!migrationFiles || migrationFiles.length === 0) {
    throw new Error("No files found to migrate");
  }

  return migrationFiles;
}

async function createSequelizeMigrationTable() {
  const queryInterface = sequelize.getQueryInterface();
  const isMigrationTableExists = await queryInterface.tableExists(Migration_Tablename);

  if (!isMigrationTableExists) {
    await queryInterface.createTable(Migration_Tablename, {
      name: { type: DataTypes.STRING, allowNull: true },
    });
  }
}

async function insertMigrationEntriesToTable(migrationFilenames) {
  const queryInterface = sequelize.getQueryInterface();

  const existingMigrations = await sequelize.query(`SELECT * FROM ${Migration_Tablename}`, {
    type: QueryTypes.SELECT,
  });

  // so that we won't add entry in the migration that already exists ..
  const migrationsSet = new Set();
  existingMigrations.forEach((migration) => {
    migrationsSet.add(migration.name);
  });

  // only push those migration filenames that are not migrated yet ..
  const updatedMigrationFilenames = [];
  migrationFilenames.forEach((migration) => {
    if (!migrationsSet.has(migration)) updatedMigrationFilenames.push({ name: migration });
  });

  if (updatedMigrationFilenames.length > 0) {
    await queryInterface.bulkInsert(Migration_Tablename, updatedMigrationFilenames);
    console.log("*** Successfully migrated: ", JSON.stringify(updatedMigrationFilenames, null, 2) + " ***");
  } else {
    console.log("*** No Files to migrate ***");
  }
}

run();
