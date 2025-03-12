#preconssola
$proceso = Start-Process powershell -ArgumentList "-NoExit", "-Command npm install; npm install -g serve; npm install -g @angular/cli; exit"

while (Get-Process -Name $proceso -ErrorAction SilentlyContinue) {
    Start-Sleep -Seconds 1
}

# Abre la primera consola y ejecuta node /backend/server.js
Start-Process powershell -ArgumentList "-NoExit", "-Command node backend/server.js"

# Abre la segunda consola y ejecuta los comandos de Angular
Start-Process powershell -ArgumentList "-NoExit", "-Command ng build --configuration production; cd dist/ciberlandia; serve -s -l 8080"
