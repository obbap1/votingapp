function addRestaurant(){
    let database = firebase.database();
    let restaurantRef = database.ref('/restaurants');
    let restaurantInput = document.getElementById('addRestaurant');
    let restaurantName = restaurantInput.value;
    restaurantInput.value = '';
    return restaurantRef.push({
        name: restaurantName,
        votes: 0
    }
    )
        .then(()=>{
            window.location.reload();
        })
        .catch(e=>{
            console.log(e);
        })
}

function upvote(key) {
    console.log(key);
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    let displayName = user.displayName;
    let database = firebase.database();
    let restaurantVotesRef = database.ref('/restaurants' + key + '/votes' + userId);

   
    restaurantVotesRef.set(displayName)
                 .then(()=>{
                      window.location.reload();   
                 })
                 .catch((e)=>{
                     console.log(e);
                 })
}

function downvote(key) {
    console.log(key);
    let database = firebase.database();
    let restaurantVotesRef = database.ref('/restaurants' + key + '/votes' + userId)
        .remove()
        .then(()=>{
            window.location.reload();
        })
        .catch((e)=>{
            console.log(e);
        })

    restaurantRef.remove(userId);
}