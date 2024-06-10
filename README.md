# Testverktyg inlämningsuppgift 2

# Projektbeskrivning

I detta projekt har vi byggt en enkel webbapplikation med HTML, CSS och JavaScript. Vi har också skapat en server som tar emot requests och skickar tillbaka responses från en MySQL-databas. Huvudfokuset ligger dock på testning av servern.

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
