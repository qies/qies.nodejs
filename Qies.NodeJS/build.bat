echo Building..
gulp clean
gulp restore-modules
gulp typescript-compile

npm publish dist