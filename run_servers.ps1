# Abre la primera consola y ejecuta node /backend/server.js
Start-Process powershell -ArgumentList "-NoExit", "-Command node backend/server.js"

# Abre la segunda consola y ejecuta los comandos de Angular
Start-Process powershell -ArgumentList "-NoExit", "-Command ng build --configuration production; cd dist/ciberlandia; serve -s -l 8080"
