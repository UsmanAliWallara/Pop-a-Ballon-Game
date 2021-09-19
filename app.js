function signup() {
    let name = document.getElementById("userName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {

            var user = userCredential.user;
            var newUser = {
                uid: user.uid,
                uemail: user.email,
                uname: name,
            }
            alert('Successfuly Signed Up');

            var database = firebase.database();
            firebase.database().ref('Users').push(newUser);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}


function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            
            var user = userCredential.user;
            
            window.location.assign('index.html')
            console.log(user)


        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });

}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        var uemail = user.email;

        var current_user = {
            uid,
            uemail
        }
        
        localStorage.setItem("current_user", JSON.stringify(current_user));
        
    } else {
       
       
    }
});

let googleSignin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;

            var {
                displayName,
                email,
                phoneNumber,
                photoURL
            } = user;
            setUser(displayName, email, phoneNumber, photoURL);
            console.log(email);

            window.location.replace('index.html');

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            alert(errorMessage);
        });
}


function setUser(userName, email, phone, photo) {
    var currentUser = {
        userName,
        email,
        phone,
        photo
    }
    console.log(currentUser);
}

function signOut() {
    firebase.auth().signOut().then(() => {
        window.location.assign('login.html')
    }).catch((error) => {
        
    });
}

let count = 0;
let score = 0;

document.getElementById('pop').innerHTML += "Red Ball";


document.addEventListener('mouseover', function (e) {

    if (e.target.className === "red") {
        
            score += 10;
            e.target.style.backgroundColor = "#ffffff";
            e.target.textContent = "POP!";
            count++;
        
            document.getElementById('score').innerHTML = +score;
            console.log("Score is:" + score); 
            
    }
    else if(e.target.className != "red"){
        let life = 3;
        var x = life-=1;
        console.log("life is:" + x)

    }

    
});



var current_user = JSON.parse(localStorage.getItem('current_user'));
var cuser = `<h4>Wellcome: (${current_user.uemail})</h4>`
document.getElementById('userName').innerHTML += cuser;