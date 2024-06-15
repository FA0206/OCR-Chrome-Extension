uploadButton.disabled = true;

document.getElementById('uploadButton').addEventListener('click', async () => {
    const fileInput = document.getElementById("fileUpload");
    const file = fileInput.files[0];
    const result = document.getElementById('result');
    const loading = document.getElementById('loading');
    
    const formData = new FormData();
    formData.append('file', file);

    loading.style.display = 'block';
    result.textContent = '';

    try {
        const response = await fetch('http://127.0.0.1:8000/ocr/', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        document.getElementById('result').innerText = data.text;

    } catch (error) {
        console.error('Error:', error);
        alert('Error processing the file. Please try again.');
    }

    loading.style.display = 'none';
});

document.getElementById('fileUpload').addEventListener('change', () => {
    const fileUpload = document.getElementById('fileUpload');
    const uploadButton = document.getElementById('uploadButton');
  
    if (fileUpload.files.length > 0) {
      uploadButton.disabled = false;
    } else {
      uploadButton.disabled = true;
    }
});