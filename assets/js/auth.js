// assets/js/auth.js
async function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await auth.signInWithPopup(provider);
        await syncUserToFirestore(result.user);
        window.location.href = 'dashboard.php';
    } catch (error) {
        console.error("Login failed", error);
        alert("Login failed: " + error.message);
    }
}

async function syncUserToFirestore(user) {
    const userRef = db.collection('users').doc(user.uid);
    await userRef.set({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
}

function logout() {
    auth.signOut().then(() => {
        window.location.href = 'index.php';
    });
}
