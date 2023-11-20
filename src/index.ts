import { Game } from "./game/game";

new Game([
  'noun', 
  //'adverb',
  //'adjective'
  //'preposition',
]).startUp()

// ! package.json, scripts:
/*
    "start2": "npm run dev-will-save",  
    "dev": "npm run dev-no-save",
    "add-new-data": "cross-env ADD_DATA=add_data ts-node --esm src/index.ts",

    "dev-will-save": "cross-env ENV_SAVING=will_save ts-node --esm src/index.ts",
    "dev-no-save": "cross-env ENV_SAVING=no_save ts-node --esm src/index.ts",

    "test": "npm run testing-with-mocha",
    "testing-with-mocha": "mocha -r chai/register-expect src/tests/*.test.ts",
    "testing-with-jest": "jest src"
*/
