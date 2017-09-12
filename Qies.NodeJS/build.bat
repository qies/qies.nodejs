echo Building..
npm install
gulp clean
gulp restore-modules
gulp typescript-compile

npm publish dist