const prompts = require('prompts');

const setConfig = require('../setConfig');
const unsetConfig = require('../unsetConfig');
const showConfig = require('../showConfig');

const addUser = require('../addUser');
const listUsers = require('../listUsers');
const removeUser = require('../removeUser');

const SET = 'set';
const UNSET = 'unset';
const SHOW = 'show';
const ADD = 'add';
const REMOVE = 'remove';
const LIST = 'list';

const topLevelPrompt = () =>
  prompts({
    type: 'select',
    name: 'choice',
    message: 'What would you like to do?',
    hint: '(use arrow keys & enter to select)',
    choices: [
      {
        title: 'Set local git user config',
        value: SET,
      },
      {
        title: 'Unset local git user config',
        value: UNSET,
      },
      {
        title: 'Show local git user config',
        value: SHOW,
      },
      {
        title: 'Add user config to guser',
        value: ADD,
      },
      {
        title: 'Remove user config from guser',
        value: REMOVE,
      },
      {
        title: 'List configs in guser',
        value: LIST,
      },
    ],
  });

const choiceHandlers = {
  [SET]: setConfig,
  [UNSET]: unsetConfig,
  [SHOW]: showConfig,
  [ADD]: addUser,
  [REMOVE]: removeUser,
  [LIST]: listUsers,
};

const topLevelMenu = async () =>
  new Promise((resolve, reject) => {
    topLevelPrompt().then(({ choice }) => {
      if (choice === undefined) {
        return reject(new Error('SIGINT'));
      }
      choiceHandlers[choice]()
        .then(resolve)
        .catch((e) => reject(e));
    });
  });

module.exports = { topLevelMenu };
