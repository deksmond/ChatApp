import firebase from 'firebase';

class fireDb {
    constructor() {
        this.init();

        this.observeAuth();

    }

    init = () =>
        firebase.initializeApp({
            apiKey: "AIzaSyDGFRsoA64DQaBQUm9VGjdaMXKyncEkA68",
            authDomain: "chat-app-295cd.firebaseapp.com",
            databaseURL: "https://chat-app-295cd.firebaseio.com",
            projectId: "chat-app-295cd",
            storageBucket: "",
            messagingSenderId: "383713329875",
            appId: "1:383713329875:web:07c17a6481a524d5"
      });

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            }catch({ message }) {
                alert(message);
            }
        }
     };

     get uid() {
         return (firebase.auth().currentuser || {}).uid;
     }

     get ref() {
         return firebase.database().ref('messages');
     }

     parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
            id_,
            timestamp,
            text,
            user,
        };
        return message;
    };

     on = callback =>
        this.ref
             .limitToLast(20)
             .on('child_added', snapshot => callback(this.parse(snapshot)));

    get timestamp() {
        return firebase.database.ServerValue.TIMESAMP;
    }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];

            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
        }
    };

    append = message => this.ref.push(message);

    off() {
        this.ref.off();
    }
}

fireDb.shared = new fireDb();
export default fireDb; 
