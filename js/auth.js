var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
	callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
    	var user = authResult.user;
        var credential = authResult.credential;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        var providerId = authResult.additionalUserInfo.providerId;
        var operationType = authResult.operationType;
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
     
      return false;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
     	//
    }
  },
  signInFlow: 'redirect',
  signInOptions: [
  {
  	// Google provider must be enabled in Firebase Console to support one-tap
      // sign-up.
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // Required to enable this provider in one-tap sign-up.
      authMethod: 'https://accounts.google.com',
      // Required to enable ID token credentials for this provider.
      // This can be obtained from the Credentials page of the Google APIs
      // console.
      clientId: '1085312691977-mcc2joh9in1s4vr42r8fkso0ldimnt3s.apps.googleusercontent.com'
    },
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

ui.start("#firebaseui-auth-container", uiConfig);


 firebase.auth().onAuthStateChanged(function(user) {
  //console.log(user)
  // Make sure there is a valid user object
  if (user) {
 		makeAnimeData();
      document.getElementById('auth').style.display = 'none';
  }	
});



