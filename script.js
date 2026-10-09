const book = document.getElementById('book');
const pages = ['Cover', 'Message', 'Photo', 'Back cover'];
let currentPage = 0;
let uploadedPhotoUrl = null;
let uploadedAudioUrl = null;

const teacherInput = document.getElementById('teacherInput');
const studentInput = document.getElementById('studentInput');
const messageInput = document.getElementById('messageInput');
const teacherHeading = document.getElementById('teacherHeading');
const displayMessage = document.getElementById('displayMessage');
const displayStudent = document.getElementById('displayStudent');
const backStudent = document.getElementById('backStudent');
const teacherPhoto = document.getElementById('teacherPhoto');
const photoPlaceholder = document.getElementById('photoPlaceholder');
const audioPlayer = document.getElementById('audioPlayer');
const musicButton = document.getElementById('musicButton');
const musicButtonText = document.getElementById('musicButtonText');
const audioStatus = document.getElementById('audioStatus');

function showPage(page) {
  currentPage = Math.max(0, Math.min(pages.length - 1, page));
  book.dataset.page = String(currentPage);
  document.getElementById('pageCount').textContent = `${pages[currentPage]} · ${currentPage + 1} of ${pages.length}`;
  document.getElementById('prevButton').disabled = currentPage === 0;
  document.getElementById('nextButton').disabled = currentPage === pages.length - 1;
}

function applyEdits() {
  const teacher = teacherInput.value.trim() || 'Your Teacher';
  const student = studentInput.value.trim() || 'Your Student';
  teacherHeading.textContent = teacher;
  displayStudent.textContent = student;
  backStudent.textContent = student;
  // Keep the greeting editable directly on the card, too.
  displayMessage.textContent = messageInput.value.trim() || 'Thank you for all that you do!';
  document.querySelector('.cover-to strong').textContent = teacher;
  document.querySelector('.cover-inner h2').setAttribute('aria-label', 'Happy Teachers’ Day');
}

document.getElementById('prevButton').addEventListener('click', () => showPage(currentPage - 1));
document.getElementById('nextButton').addEventListener('click', () => showPage(currentPage + 1));
document.querySelector('.page-cover').addEventListener('click', () => showPage(1));
document.getElementById('applyButton').addEventListener('click', applyEdits);
document.getElementById('resetButton').addEventListener('click', () => {
  teacherInput.value = 'Mr. Randy Bello';
  studentInput.value = 'Lorraine Joyce Valler';
  messageInput.value = 'Happy Teachers’ Day! Thank you for your patience, guidance, and dedication. Your lessons inspire us to learn, grow, and become better people. We truly appreciate everything you do for us!';
  applyEdits();
});

displayMessage.addEventListener('input', () => { messageInput.value = displayMessage.textContent; });
messageInput.addEventListener('input', () => { displayMessage.textContent = messageInput.value; });

document.getElementById('photoInput').addEventListener('change', (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (uploadedPhotoUrl) URL.revokeObjectURL(uploadedPhotoUrl);
  uploadedPhotoUrl = URL.createObjectURL(file);
  teacherPhoto.src = uploadedPhotoUrl;
  teacherPhoto.hidden = false;
  photoPlaceholder.hidden = true;
  showPage(2);
});

teacherPhoto.addEventListener('error', () => {
  teacherPhoto.hidden = true;
  photoPlaceholder.hidden = false;
});

document.getElementById('audioInput').addEventListener('change', (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (uploadedAudioUrl) URL.revokeObjectURL(uploadedAudioUrl);
  uploadedAudioUrl = URL.createObjectURL(file);
  audioPlayer.src = uploadedAudioUrl;
  audioStatus.textContent = `Selected: ${file.name}`;
  musicButtonText.textContent = 'Play music';
  musicButton.setAttribute('aria-pressed', 'false');
});

musicButton.addEventListener('click', async () => {
  if (audioPlayer.paused) {
    try {
      await audioPlayer.play();
      musicButtonText.textContent = 'Pause music';
      musicButton.setAttribute('aria-pressed', 'true');
    } catch (error) {
      audioStatus.textContent = 'Audio could not start. Try choosing an audio file with “Add audio”.';
    }
  } else {
    audioPlayer.pause();
    musicButtonText.textContent = 'Play music';
    musicButton.setAttribute('aria-pressed', 'false');
  }
});

audioPlayer.addEventListener('ended', () => {
  musicButtonText.textContent = 'Play music';
  musicButton.setAttribute('aria-pressed', 'false');
});
applyEdits();
showPage(0);
