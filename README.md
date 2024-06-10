# Testverktyg inlämningsuppgift 2

# Projektbeskrivning

I denna uppgift har jag byggt en REST API server integrerad med MySQL databas. Till denna server har jag skrivit testsviter med Postman för att testa end-2-end och superttest och Mocha för att testa inregrationen mellan olika delar av severn och för att testa specifika funktioners beteende.

## Krav

- Konto och inloggningsuppgifter till MySQL, skapa databas och en tabell med namnet products med de fält som finns i nämnda i uppgiftsbeskrivningen.

## Installationsguide

1. Ladda ner zip-filen till valfri plats.
2. Extrahera alla filer.
3. Öppna terminalen.
4. Navigera till mappen "test_verktyg_uppgift2" via terminalen.
5. Starta servern i terminalen genom att ange kommandot: `npm start`
6. Skapa en fil som heter `.env`.
    - Sätt `USER`, `PASSWORD`, `HOST` och `DATABASE` till dina inloggningsuppgifter till MySQL-workbench.
7. För att köra alla test med mocha och generera testrapport, kör `npm run test` 

## Skapad av

- Tomislav Vuckovic
