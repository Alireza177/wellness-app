Title: Hälsa app

App idé och beskrivning:
Appen hjälper användaren att hålla koll på deras dagliga hälsa genom att låta dem logga sitt vattenintag, steg, humör och träningspass. Den ger även motiverande meddelanden beroende på deras framsteg under dagen.

Komponenter som används:

React Native-komponenter:
Text: För att visa textinnehåll som titlar, instruktioner och dagliga mål.
ScrollView: För att strukturera layouten och ha en scrollbar screen.
View: För att strukturera layouten av olika sektioner i appen.
TouchableOpacity: För att skapa klickbara knappar.
TextInput: För att låta användaren skriva in data, som vattenintag.
Image: För att visa Profile bilden.
StyleSheet: For att styla komponenterna.


Expo-komponenter:
Expo Location: För att logga användarens plats och se var de har tränat (t.ex. om de går en promenad).
Expo Notifications: För att skicka pushnotiser som påminnelser om att dricka vatten.
Expo Sensor: Används för att läsa användarens stegräknare (om telefonen har det inbyggt).
Expo ImagePicker: Låter användaren ladda upp en bild på deras träning.