function checkedIfLoggedIn() {
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
            document.getElementById('google-signin')
            .setAttribute('style','display:none;visibility:hidden');
            document.getElementById('signout')
            .setAttribute('style','display:inline-block;visibility:visible');
        }else{
            document.getElementById('google-signin')
            .setAttribute('style','display:inline-block;visibility:visible');
            document.getElementById('signout')
            .setAttribute('style','display:none;visibility:hidden');
        }
    }) 
}

function signout() {
    firebase.auth().signOut();
    document.getElementById('google-pic').src = '';
}

window.onload = ()=>{
    checkedIfLoggedIn();
}


function signInWithGoogle() {
    let googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(data=>{
            console.log(data);
            document.getElementById('google-display').innerHTML = data.user.displayName;
            document.getElementById('google-pic').src = data.user.photoURL;
            let idToken = data.credential.idToken;
            localStorage.setItem('firebase_idTokem',idToken);
        })
        .catch(e=>{
            console.log(e);
        })
}
