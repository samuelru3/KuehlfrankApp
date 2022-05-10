const KuehlfrankApp = {
    data() {
        return {
            // --- Variablen zum Sichtbarmachen
            display: {
                Formular: false,
                Statistik: true,
                Liste: true,
                Update: false
            },

            // --- für Update
            aktuellerIndex: -1
        }
    },

    computed: {

    },

    methods: {

    },

    mounted() {
        this.laden();
    }
}
Vue.createApp(KuehlfrankApp).mount('#kuehlfrank-app');