import { db } from "../prisma/prismaClient.js";
import { setupDatabaseForOperations } from "./operations/prepareDatabase.js";

async function main() {
  await setupDatabaseForOperations();
}

main()
  .catch((e) => console.error(e))
  .finally(() => {
    console.log("Finished database operations.");
    db.$disconnect()
  });
