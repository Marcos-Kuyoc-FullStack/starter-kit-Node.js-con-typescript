import { AsyncContainerModule } from "inversify";

export const bindings = new AsyncContainerModule(async (bind) => {
    await require("../../../controllers/home.ts");
});