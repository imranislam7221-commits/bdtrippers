async function uploadDocuments() {
    const user = auth.currentUser;
    if (!user) return;

    const passportFile = document.getElementById('passport-file').files[0];
    const photoFile = document.getElementById('photo-file').files[0];
    const statusDiv = document.getElementById('upload-status');

    if (!passportFile && !photoFile) {
        alert("Please select at least one file.");
        return;
    }

    statusDiv.innerHTML = "Uploading...";

    try {
        if (passportFile) {
            const ref = storage.ref(`documents/${user.uid}/passport_${Date.now()}_${passportFile.name}`);
            await ref.put(passportFile);
        }
        if (photoFile) {
            const ref = storage.ref(`documents/${user.uid}/photo_${Date.now()}_${photoFile.name}`);
            await ref.put(photoFile);
        }
        statusDiv.innerHTML = '<span class="text-success">Upload successful!</span>';
        alert("Documents uploaded successfully!");
    } catch (error) {
        statusDiv.innerHTML = '<span class="text-danger">Upload failed.</span>';
        console.error(error);
    }
}
