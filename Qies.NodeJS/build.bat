echo Building..
cd Qies.NodeJS
call npm install
call gulp clean
call gulp restore-modules
call gulp typescript-compile