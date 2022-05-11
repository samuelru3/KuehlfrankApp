

const LebensmittelApp = {
    data() {
        return {
            // --- Daten des neuen Lebensmittels --- 
            newLebensmittel: {
                name: 'Pikachu',
                mhd: 'Wasser',
                geoeffnetSeit: 'Elektro',
                kategorie: 'Wasser',
                gender: 'w',
                donnerblitz: false,
                voltoball: true,
                surfer: false
            },

            // --- Daten des neuen Namens --- 
            newName: {
                name: 's',
                kategorie: 's',
            },



            // Daten des Lebensmittels, welches upgedated wird
            updateLebensmittel: {},

            // --- Liste aller Lebensmittel ---
            lebensmittelList: [
                { id: 0, name: 'Voltoball', mhd: 'Elektro', geoeffnetSeit: 'Wasser', kategorie: 'Wasser', gender: 'd', donnerblitz: true, voltoball: true, surfer: false, attacken: 'Donnerblitz, Voltoball' },
                { id: 1, name: 'Relaxo', mhd: 'Normal', geoeffnetSeit: 'Normal', kategorie: 'Normal', gender: 'm', donnerblitz: false, voltoball: false, surfer: true, attacken: 'Surfer' }
            ],

            // --- Liste aller Lebensmittel ---
            namenList: [
                { id: 0, name: 'Milch', kategorie: 'Milchprodukte' }
            ],

            // --- Variablen zum Sichtbarmachen
            display: {
                Formular: true,
                Statistik: false,
                Liste: false,
                Update: false
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
            this.display.Statistik = false;
            this.display.Liste = false;
            this.display.Formular = true;
            this.display.Update = false;
        },

        statistikUndListeAnzeigen() {
            this.display.Statistik = false;
            this.display.Liste = true;
            this.display.Formular = false;
            this.display.Update = false;
        },

        updateAnzeigen() {
            this.display.Statistik = false;
            this.display.Liste = false;
            this.display.Formular = false;
            this.display.Update = true;
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
                gender: this.newLebensmittel.gender,
                donnerblitz: this.newLebensmittel.donnerblitz,
                voltoball: this.newLebensmittel.voltoball,
                surfer: this.newLebensmittel.surfer,
                attacken: this.newLebensmittel.attackenliste // FEHLER!
            };

            // neues Lebensmittel an Liste anhängen
            this.lebensmittelList.push(newLebensmittel);

            // Statistik und Liste anzeigen
            this.statistikUndListeAnzeigen();

            // Daten persistent speichern
            this.speichern();
        },

        buttonNameHinzufuegen() {
            // neues Produkt erzeugen
            const newName = {
                id: this.nextIdName,
                name: this.newName.name,
                kategorie: this.newName.kategorie,
            };

            // neues Lebensmittel an Liste anhängen
            this.namenList.push(newName);

            // Statistik und Liste anzeigen
            this.statistikUndListeAnzeigen();

            // Daten persistent speichern
            this.speichern();
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
            for (let i = 0; i < this.lebensmittelList.length; i++) {
                if (this.lebensmittelList[i].id === id) {
                    index = i;
                }
            }
            let aktuellesLebensmittel = this.lebensmittelList[index];

            // Daten vom Lebensmittel auf GUI übertragen
            this.updateLebensmittel.id = aktuellesLebensmittel.id;
            this.updateLebensmittel.name = aktuellesLebensmittel.name;
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
        },

        buttonAenderungenSpeichern(index) {
            // neues Lebensmittel erzeugen als Kopie
            const newLebensmittel = Object.assign({}, this.updateLebensmittel);

            /*
            Umständlicher Quellcode zum Erzeugen einer Kopie
            const newLebensmittel = {
                id: this.updateLebensmittel.id,
                name: this.updateLebensmittel.name,
                mhd: this.updateLebensmittel.mhd,
                geoeffnetSeit: this.updateLebensmittel.geoeffnetSeit,
                kategorie: this.updateLebensmittel.kategorie,
                gender: this.updateLebensmittel.gender,
                donnerblitz: this.updateLebensmittel.donnerblitz,
                voltoball: this.updateLebensmittel.voltoball,
                surfer: this.updateLebensmittel.surfer,
                attacken: this.updateLebensmittel.attackenliste
            };
            */

            // altes Lebensmittel durch neues ersetzen
            this.lebensmittelList[index] = newLebensmittel;

            // Statistik und Liste anzeigen
            this.statistikUndListeAnzeigen();

            // Daten persistent speichern
            this.speichern();
        },

        buttonAenderungenSpeichernName(index) {
            // neues Name erzeugen als Kopie
            const newName = Object.assign({}, this.updateName);

            // altes Name durch neues ersetzen
            this.namenList[index] = newName;

            // Statistik und Liste anzeigen
            this.statistikUndListeAnzeigen();

            // Daten persistent speichern
            this.speichern();
        },

        buttonCancel() {
            // GUI anzeigen
            this.statistikUndListeAnzeigen();
        },

        // ### Persistenz: localStorage ###
        speichern() {
            // Komplettes Array mit Lebensmittel und Namen im 'localStorage' speichern
            const text = JSON.stringify(this.lebensmittelList);
            localStorage.setItem('lebensmittelliste', text);
            this.namenSpeichern();
        },

        // ### Persistenz: localStorage ###
        namenSpeichern() {
            // Komplettes Array mit Lebensmittel und Namen im 'localStorage' speichern
            const text = JSON.stringify(this.namenList);
            localStorage.setItem('NamensListe', text);
        },

        laden() {
            // Daten aus 'localStorage' laden
            if (localStorage.getItem('lebensmittelliste')) {
                let dataString = localStorage.getItem('lebensmittelliste');
                this.lebensmittelList = JSON.parse(dataString);
            } else {
                this.lebensmittelList = [];
            }
            this.namenLaden();
        },

        namenLaden() {
            // Daten aus 'localStorage' laden
            if (localStorage.getItem('NamensLioste')) {
                let dataString = localStorage.getItem('NamensListe');
                this.namenList = JSON.parse(dataString);
            } else {
                this.namenList = [];
            }
        }
    },

    mounted() {
        // Persistent gespeicherte Daten laden
        this.laden();
    }
};
Vue.createApp(LebensmittelApp).mount('#kuehlfrank-app');





// const KuehlfrankApp = {
//     data() {
//         return {
//             // --- Liste aller Lebensmittel ---
//             lebensmittelList: [
//                 { id: 0, name: 'Voltoball', mhd: 'Elektro', geoeffnetSeit: 'Wasser', gender: 'd', donnerblitz: true, voltoball: true, surfer: false, attacken: 'Donnerblitz, Voltoball' },
//                 { id: 1, name: 'Relaxo', mhd: 'Normal', geoeffnetSeit: 'Normal', gender: 'm', donnerblitz: false, voltoball: false, surfer: true, attacken: 'Surfer' }
//             ],

//             // --- Variablen zum Sichtbarmachen
//             display: {
//                 Formular: false,
//                 Statistik: false,
//                 Liste: true,
//                 Update: false
//             },

//             // --- für Update
//             aktuellerIndex: -1
//         }
//     },

//     computed: {

//     },

//     methods: {
//         // ### Persistenz: localStorage ###
//         speichern() {
//             // Komplettes Array mit Lebensmittel im 'localStorage' speichern
//             const text = JSON.stringify(this.lebensmittelList);
//             localStorage.setItem('lebensmittelliste', text);
//         },

//         laden() {
//             // Daten aus 'localStorage' laden
//             if (localStorage.getItem('lebensmittelliste')) {
//                 let dataString = localStorage.getItem('lebensmittelliste');
//                 this.lebensmittelList = JSON.parse(dataString);
//             } else {
//                 this.lebensmittelList = [];
//             }
//         }
//     },

//     mounted() {
//         this.laden();
//     }
// }
// Vue.createApp(KuehlfrankApp).mount('#kuehlfrank-app');
