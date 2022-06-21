// Your web app's Firebase configuration
var firebaseConfig = {
    //code
    apiKey: "AIzaSyCUuMai2v1A4Zh3VKmPRy9ixmONniSvJSI",
    authDomain: "user-profile-7fdff.firebaseapp.com",
    projectId: "user-profile-7fdff",
    storageBucket: "user-profile-7fdff.appspot.com",
    messagingSenderId: "971821456885",
    appId: "1:971821456885:web:757534d81002493db0d4bc",
    measurementId: "G-JHNDBC2M0Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging()

  // subscribe
  function subscribe(){
        Notification.requestPermission().then(permission=>{
          console.log(permission)
          if(permission == "granted"){
              messaging.getToken({vapidKey:process.env.FB_KEY}).then(currentToken=>{
                  console.log(currentToken)
                  document.getElementById('showToken').innerHTML = currentToken

              })
          }
        }).catch(e=>{
            console.log(e)
        })
  }

  messaging.onMessage(res=>{
      console.log(res)
  })

  // send Notofication
  function sendNotification(){
      // Get data
      const token = document.getElementById('usertoken').value 
      const title = document.getElementById('title').value
      const msg = document.getElementById('msg').value

      let body = {
          to: token,
          notification:{
              title: title,
              body: msg,
              icon:'icon.png',
              click_action:"localhost/firebase"
          }
      }
      console.log(body)

      const options = {
          method: "POST",
          headers: new Headers({
            Authorization:"key=YOUR_SERVER_KEY",
            "Content-Type":"application/json"
          }),
          body:JSON.stringify(body)
      }

      fetch("https://fcm.googleapis.com/fcm/send", options).then(res=>res.json()).then(data=>{
            console.log(data)
      }).catch(e=>console.log(e))

  }
