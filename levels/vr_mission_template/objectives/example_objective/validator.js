/*
In your validation code, you can require core Node.js modules,
third-party modules from npm, or your own code, just like a regular
Node.js module (since that's what this is!)
*/
const assert = require("assert");
const R = require("ramda");
const { isTwilio } = require("../lib/example_helper");

/*
Objective validators export a single function, which is passed a helper
object. The helper object contains information passed in from the game UI,
such as what the player entered into the fields in the hack interface.

The helper object also has "success" and "fail" callback functions - use
these functions to let the game (and the player) know whether or not they 
have completed the challenge as instructed.
*/
module.exports = async function (helper) {
  // We start by getting the user input from the helper
  const { answer1, answer2, answer3 } = helper.validationFields;

  // Next, you test the user input - fail fast if they get one of the
  // answers wrong, or some aspect is wrong! Don't provide too much
  // negative feedback at once, have the player iterate.
  if (!answer1 || Number(answer1) !== 20) {
    return helper.fail(`
      The first answer is incorrect. Think about how many seconds it takes
      to get that alarm bot cooled down! (Hint: it's more than 10 seconds 
      and less than 30 seconds)
    `);
  }

  // You can use npm or core Node.js dependencies in your validators!
  try {
    assert.strictEqual(0, Number(answer2));
  } catch (e) {
    return helper.fail(`
      The second answer is incorrect. Think about the effects of the alarm
      bot and what its primary use case is.
    `);
  }

  if (!answer3 || answer3 === "true") {
    return helper.fail(`
      The third answer is incorrect. Can you really recall something that is destroyed?
    `);
  }

  // The way we usually write validators is to fail fast, and then if we reach
  // the end, we know the user got all the answers right!
  helper.success(`
    Hooray! You did it! You can trust Killjoy's bots now!
  `);
};
