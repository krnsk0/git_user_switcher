const prompts = require('prompts');
const { makeChoicesFromUsers } = require('../utils/pureUtils');
const { setLocalGitUser } = require('../utils/gitUtils');
const { loadUserData } = require('../utils/fileUtils');

const setUserPrompt = (userData) =>
  prompts(
    {
      type: 'select',
      name: 'hash',
      message: 'Choose a user config to set in the local git repo',
      hint: '(use arrow keys & enter to select)',
      choices: makeChoicesFromUsers(userData),
    },
    {}
  );

const setConfig = () =>
  new Promise((resolve, reject) => {
    const userData = loadUserData();
    setUserPrompt(userData).then(({ hash }) => {
      if (hash === undefined) {
        return reject(new Error('SIGINT'));
      }
      const { username, email } = userData.find((entry) => entry.hash === hash);
      setLocalGitUser(username, email);

      resolve();
    });
  });

module.exports = { setConfig };
