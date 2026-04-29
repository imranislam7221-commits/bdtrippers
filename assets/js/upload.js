async function uploadDocuments() {
    const user = auth.currentUser;
    if (!user) return;

    const passportFile = document.getElementById('passport-file').files[0];
    const photoFile = document.getElementById('photo-file').files[0];
    const statusDiv = document.getElementById('upload-status');
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB

    if (!passportFile && !photoFile) {
        alert("Please select at least one file.");
        return;
    }

    // Check file sizes
    if (passportFile && passportFile.size > MAX_SIZE) {
        alert("Passport file is too big! Max limit 5MB.");
        return;
    }
    if (photoFile && photoFile.size > MAX_SIZE) {
        alert("Photo file is too big! Max limit 5MB.");
        return;
    }

    statusDiv.innerHTML = "Uploading...";

    const uploadFile = (file, type) => {
        return new Promise((resolve, reject) => {
            const ref = storage.ref(`documents/${user.uid}/${type}_${Date.now()}_${file.name}`);
            const uploadTask = ref.put(file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    statusDiv.innerHTML = `Uploading ${type}: ${Math.round(progress)}%`;
                },
                (error) => reject(error),
                () => resolve()
            );
        });
    };

    try {
        if (passportFile) {
            await uploadFile(passportFile, 'passport');
        }
        if (photoFile) {
            await uploadFile(photoFile, 'photo');
        }
        statusDiv.innerHTML = '<span class="text-success">Upload successful!</span>';
        alert("Documents uploaded successfully!");
    } catch (error) {
        let errorMsg = "Upload failed.";
        if (error.code === 'storage/unauthorized') {
            errorMsg = "No permission to upload.";
        } else if (error.code === 'storage/retry-limit-exceeded') {
            errorMsg = "Upload took too long, try again.";
        }
        statusDiv.innerHTML = `<span class="text-danger">${errorMsg}</span>`;
        console.error(error);
    }
}
