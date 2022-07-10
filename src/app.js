// console.error('sdgsgd');
import { inDatenbankSchreiben, namenAusDatenbankLesen } from "./index.js";
import { getDatabase, connectDatabaseEmulator, ref, child, get, onValue } from "firebase/database";

const LebensmittelApp = {

    data() {
        return {
            // --- Daten des neuen Lebensmittels --- 
            newLebensmittel: {
                kategorie: '',
                name: ' ',
                mhd: '',
                geoeffnetSeit: '',
            },

            // --- Daten des neuen Namens --- 
            newName: {
                kategorie: '',
                name: '',
            },

            laeuftAbInTagen: "",

            // Daten des Lebensmittels, welches upgedated wird
            updateLebensmittel: {},

            // Daten des Lebensmittels, welches upgedated wird
            updateName: {},

            // --- Liste aller Lebensmittel ---
            lebensmittelList: [],

            // --- Liste aller Lebensmittel ---
            namenList: [],

            // --- Variablen zum Sichtbarmachen
            // Startbildsachirm
            display: {
                Formular: false,
                Statistik: false,
                Liste: true,         // Liste ist Standart (true):
                Update: false,
                UpdateVonName: false,
                NeuerName: false,
                ListeNamen: false,
                Header: true,
                Anmeldung: false,
            },
            // --- für Update
            aktuellerIndex: -1
        }
    },

    computed: {

        // --- berechnete Datenfelder ---
        // --- werden zwischengespeichert ---
        anzahlLebensmittel() {
            return this.lebensmittelList.length;
        },

        anzahlMaennlich() {
            let anzahl = 0;
            for (let i = 0; i < this.lebensmittelList.length; i++) {
                if (this.lebensmittelList[i].gender === 'm') {
                    anzahl++;
                }
            }
            return anzahl;
        },

        anzahlWeiblich() {
            let anzahl = 0;
            for (let i = 0; i < this.lebensmittelList.length; i++) {
                if (this.lebensmittelList[i].gender === 'w') {
                    anzahl++;
                }
            }
            return anzahl;
        },

        anteilWeiblichProzent() {
            const prozentWert = 100 * this.anzahlWeiblich / this.anzahlLebensmittel;
            const prozentWertGerundet = prozentWert.toFixed(0);
            return prozentWertGerundet;
        },

        anzahlDivers() {
            let anzahl = 0;
            for (let i = 0; i < this.lebensmittelList.length; i++) {
                if (this.lebensmittelList[i].gender === 'd') {
                    anzahl++;
                }
            }
            return anzahl;
        },

        nextId() {
            // maximale Id + 1
            let maximaleId = -1;
            for (let i = 0; i < this.lebensmittelList.length; i++) {
                if (this.lebensmittelList[i].id > maximaleId) {
                    maximaleId = this.lebensmittelList[i].id;
                }
            }
            return maximaleId + 1;
        },

        nextIdName() {
            // maximale Id + 1
            let maximaleId = -1;
            for (let i = 0; i < this.namenList.length; i++) {
                if (this.namenList[i].id > maximaleId) {
                    maximaleId = this.namenList[i].id;
                }
            }
            return maximaleId + 1;
        },

        attackenliste() {
            let text = '';
            if (this.donnerblitz) {
                text += 'Donnerblitz ';
            }
            if (this.voltoball) {
                text += 'Voltoball ';
            }
            if (this.surfer) {
                text += 'Surfer ';
            }
            return text;
        }
    },

    methods: {
        // ### Komponenten anzeigen und verstecken ###
        formularAnzeigen() {
            this.display.Liste = false;
            this.display.Formular = true;
            this.display.NeuerName = false;
            this.display.ListeNamen = false;
        },

        statistikUndListeAnzeigen() {
            this.display.Statistik = false;
            this.display.Liste = true;
            this.display.Formular = false;
            this.display.Update = false;
            this.display.NeuerName = false;
            this.display.ListeNamen = false;
            this.display.UpdateVonName = false;
            this.display.Anmeldung = false;
        },

        updateAnzeigen() {
            this.display.Statistik = false;
            this.display.Liste = false;
            this.display.Formular = false;
            this.display.Update = true;
            this.display.NeuerName = false;
            this.display.ListeNamen = false;
            this.display.UpdateVonName = false;
            this.display.Anmeldung = false;
        },

        namenListeAnzeigen() {
            this.display.Statistik = false;
            this.display.Liste = false;
            this.display.Formular = false;
            this.display.Update = false;
            this.display.NeuerName = false;
            this.display.ListeNamen = true;
            this.display.UpdateVonName = false;
            this.display.Anmeldung = false;
        },

        nameHinzufuegenAnzeigen() {
            this.display.Statistik = false;
            this.display.Liste = false;
            this.display.Formular = false;
            this.display.Update = false;
            this.display.NeuerName = true;
            this.display.ListeNamen = false;
            this.display.UpdateVonName = false;
            this.display.Anmeldung = false;
        },

        updateNameAnzeigen() {
            this.display.Statistik = false;
            this.display.Liste = false;
            this.display.Formular = false;
            this.display.Update = false;
            this.display.NeuerName = false;
            this.display.ListeNamen = false;
            this.display.UpdateVonName = true;
            this.display.Anmeldung = false;
        },

        // ### Handler für Buttons ###
        buttonHinzufuegen() {
            // neues Lebensmittel erzeugen
            const newLebensmittel = {
                id: this.nextId,
                name: this.newLebensmittel.name,
                mhd: this.newLebensmittel.mhd,
                geoeffnetSeit: this.newLebensmittel.geoeffnetSeit,
                kategorie: this.newLebensmittel.kategorie,
            };

            // neues Lebensmittel an Liste anhängen
            this.lebensmittelList.push(newLebensmittel);

            // Statistik und Liste anzeigen
            this.statistikUndListeAnzeigen();

            // Daten persistent speichern
            this.speichern();
        },

        buttonNameHinzufuegen() {
            console.log('Button Name Hinzufügen');
            this.namenLaden();
            // neuen Namen Hinzufügen
            const newName = {
                id: this.nextIdName,
                name: this.newName.name,
                kategorie: this.newName.kategorie,
            };
            console.log('srg');
            // neues Lebensmittel an Liste anhängen
            this.namenList.push(newName);
            console.log(newName);


            // Statistik und Liste anzeigen
            this.formularAnzeigen();

            // Daten persistent speichern
            this.namenSpeichern();

        },

        buttonNameAbbrechen() {
            console.log('Button Name Abbrechen');
            // Statistik und Liste anzeigen
            this.formularAnzeigen();
        },

        buttonLoeschen(id) {
            // Lebensmittel mit der id von Liste enfernen
            let index = -1;
            for (let i = 0; i < this.lebensmittelList.length; i++) {
                if (this.lebensmittelList[i].id === id) {
                    index = i;
                }
            }
            this.lebensmittelList.splice(index, 1);

            // Daten persistent speichern
            this.speichern();
        },

        buttonUpdate(id) {
            // Daten des Lebensmittel mit id holen
            let index = -1;
            console.log('buttonUpdate');
            for (let i = 0; i < this.lebensmittelList.length; i++) {
                if (this.lebensmittelList[i].id === id) {
                    index = i;
                }
            }
            let aktuellesLebensmittel = this.lebensmittelList[index];

            // Daten vom Lebensmittel auf GUI übertragen
            this.updateLebensmittel.id = aktuellesLebensmittel.id;
            this.updateLebensmittel.name = aktuellesLebensmittel.name;
            console.log(this.updateLebensmittel.name);
            this.updateLebensmittel.mhd = aktuellesLebensmittel.mhd;
            this.updateLebensmittel.geoeffnetSeit = aktuellesLebensmittel.geoeffnetSeit;
            this.updateLebensmittel.kategorie = aktuellesLebensmittel.kategorie;
            this.updateLebensmittel.gender = aktuellesLebensmittel.gender;
            this.updateLebensmittel.donnerblitz = aktuellesLebensmittel.donnerblitz;
            this.updateLebensmittel.voltoball = aktuellesLebensmittel.voltoball;
            this.updateLebensmittel.surfer = aktuellesLebensmittel.surfer;

            this.aktuellerIndex = index;


            // GUI anzeigen
            this.updateAnzeigen();
            console.log(this.updateLebensmittel.name);
        },

        buttonNameUpdate(id) {
            // Daten des Namens mit id holen
            let index = -1;
            for (let i = 0; i < this.namenList.length; i++) {
                console.log(this.namenList.length);
                if (this.namenList[i].id === id) {
                    index = i;
                }
            }
            let aktuellerName = this.namenList[index];

            // Daten vom Namen auf GUI übertragen
            this.updateName.id = aktuellerName.id;
            this.updateName.name = aktuellerName.name;
            this.updateName.kategorie = aktuellerName.kategorie;
            this.aktuellerIndex = index;
            console.log(this.updateName.id);
            console.log(this.updateName.name);
            console.log(this.updateName.kategorie);
            console.log(this.aktuellerIndex);

            // GUI anzeigen
            this.updateNameAnzeigen();
        },

        buttonAenderungenSpeichern(index) {
            // neues Lebensmittel erzeugen als Kopie
            const newLebensmittel = Object.assign({}, this.updateLebensmittel);

            // altes Lebensmittel durch neues ersetzen
            this.lebensmittelList[index] = newLebensmittel;

            // Statistik und Liste anzeigen
            this.statistikUndListeAnzeigen();

            // Daten persistent speichern
            this.speichern();
        },

        buttonNamenAenderungenSpeichern(index) {
            // neuer Name erzeugen als Kopie
            const newName = Object.assign({}, this.updateName);

            // alter Name durch neuen ersetzen
            this.namenList[index] = newName;

            // Statistik und Liste anzeigen
            this.namenListeAnzeigen();

            // Daten persistent speichern
            this.namenSpeichern();
        },


        buttonCancel() {
            // GUI anzeigen
            this.statistikUndListeAnzeigen();
        },

        buttonNameCancel() {
            // GUI anzeigen
            this.namenListeAnzeigen();
        },

        // ### Persistenz: localStorage ###
        speichern() {
            // Komplettes Array mit Lebensmittel und Namen im 'localStorage' speichern
            const text = JSON.stringify(this.lebensmittelList);
            localStorage.setItem('lebensmittelliste', text);
        },

        //NAME Persistenz: localStorage ###
        namenSpeichern() {
            // Komplettes Array mit Lebensmittel und Namen im 'localStorage' speichern
            const text = JSON.stringify(this.namenList);
            localStorage.setItem('namenList', text);
            // console.log('namenspeichern ende');
            // console.log(text);
            // console.log(this.namenList);
        },

        laden() {
            // Daten aus 'localStorage' laden
            if (localStorage.getItem('lebensmittelliste') || false) {
                let dataString = localStorage.getItem('lebensmittelliste');
                this.lebensmittelList = JSON.parse(dataString);
            } else {
                console.log('Lebensmittelliste nicht vorhanden -> wird neu erstellt');
                var lebensmittelList = [];
                this.speichern();
                console.log(lebensmittelList + 'Fertig');
            }

        },

        namenLaden() {
            // Daten aus 'localStorage' laden
            if (localStorage.getItem('namenList')) {
                let dataString = localStorage.getItem('namenList');
                this.namenList = JSON.parse(dataString);
            } else {
                console.log('Namenslliste nicht vorhanden -> wird neu erstellt');
                var dataNamen = [{ "id": 2, "kategorie": "Milchprodukte", "name": "Milch" }, { "id": 3, "kategorie": "Milchprodukte", "name": "Käse" }, { "id": 4, "kategorie": "Milchprodukte", "name": "Butter" }, { "id": 5, "kategorie": "Milchprodukte", "name": "Jogurt" }, { "id": 6, "kategorie": "Obst", "name": "Banane" }, { "id": 7, "kategorie": "Obst", "name": "Apfel" }];
                console.log(dataNamen);
                console.log('namenladen');
                const text = JSON.stringify(dataNamen);
                localStorage.setItem('namenList', text);
                let dataString = localStorage.getItem('namenList');
                this.namenList = JSON.parse(dataString);
            }
        },

        namenAusDatenbankImport() {
            // namenAusDatenbankLesen();
            console.log(namenAusDatenbankLesen());
        },


        MHDDifferenzTage(lebensmittel) {
            const startDateTime = new Date(lebensmittel.mhd);
            const startStamp = startDateTime.getTime();
            let newDate = new Date();
            let newStamp = newDate.getTime();
            let diff = Math.round((startStamp - newStamp) / 1000);
            let d = Math.floor(diff / (24 * 60 * 60));
            let tage = "in " + d + " Tagen  "
            if (d + "" === "NaN") {
                return null;
            } else {
                return tage
            }
        },

        opendDifferenzTage(lebensmittel) {
            const startDateTime = new Date(lebensmittel.geoeffnetSeit);
            const startStamp = startDateTime.getTime();
            let newDate = new Date();
            let newStamp = newDate.getTime();
            let diff = Math.round((newStamp - startStamp) / 1000);
            let d = Math.floor(diff / (24 * 60 * 60));
            let tage = "vor " + d + " Tagen";
            if (d + "" === "NaN") {
                return null;
            } else {
                return tage;
            }
        },


        // namenAusDatenbankImport2() {
        //     const dbRef = ref(getDatabase());
        //     get(child(dbRef, `cloudNamenList`)).then((snapshot) => {
        //         if (snapshot.exists()) {
        //             console.log(snapshot.val());
        //             const text = JSON.stringify(snapshot.val());
        //             localStorage.setItem('namenList', text);
        //             this.namenLaden();
        //         } else {
        //             console.log("No data available");
        //         }
        //     }).catch((error) => {
        //         console.error(error);
        //     });
        // },
    },

    mounted() {
        this.laden();
        inDatenbankSchreiben();
        // this.differenzTage();
        // this.namenAusDatenbankImport2();
        this.namenLaden();
        this.differenzTage();
    },
};
Vue.createApp(LebensmittelApp).mount('#kuehlfrank-app');

const auth = getAuth(firebaseApp);
