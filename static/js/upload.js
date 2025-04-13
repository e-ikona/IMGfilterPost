
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-upload');
const fileNameDisplay = document.getElementById('fileName');
const uploadForm = document.getElementById('uploadForm');
const analyzeBtn = document.getElementById('analyzeBtn');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');
const loadingSpinner = document.getElementById('loadingSpinner');

function showUploadSuccess(file) {
    dropzone.classList.remove('border-gray-300');
    dropzone.classList.add('border-green-500', 'bg-green-50');
    fileNameDisplay.textContent = `File "${file.name}" uploaded successfully.`;
    fileNameDisplay.classList.remove('hidden');
}

// File selected via input
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) showUploadSuccess(file);
});

// Drag & Drop support
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('bg-gray-200');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('bg-gray-200');
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('bg-gray-200');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        fileInput.files = e.dataTransfer.files;
        showUploadSuccess(file);
    }
});

// Form submission with loading state
uploadForm.addEventListener('submit', function (e) {
    if (!fileInput.files || fileInput.files.length === 0) {
        e.preventDefault();
        alert('Please select an image file first');
        return;
    }

    // Show loading state
    btnText.textContent = 'Analyzing...';
    btnIcon.classList.add('hidden');
    loadingSpinner.classList.remove('hidden');
    analyzeBtn.disabled = true;
});

// If form submission fails, reset the button state
window.addEventListener('unload', function () {
    btnText.textContent = 'Analyze Image';
    loadingSpinner.classList.add('hidden');
    btnIcon.classList.remove('hidden');
    analyzeBtn.disabled = false;
});