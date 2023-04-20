const pdfFile = document.getElementById('pdfFile');
const downloadButton = document.getElementById('downloadButton');
const copyButton = document.getElementById('copyButton');
const output = document.getElementById('output');
const loadingBanner = document.getElementById('loadingBanner');
const copiedBanner = document.getElementById('copiedBanner');
const fileName = document.getElementById('fileName');
const wordCount = document.getElementById('wordCount');
const wordCountNum = document.getElementById('wordCountNum');
const charCount = document.getElementById('charCount');
const charCountNum = document.getElementById('charCountNum');
const pdfFileLabel = document.querySelector('label[for="pdfFile"]');
const customFileUpload = document.querySelector('.fileUpload');
const alertBanner = document.getElementById('alertBanner');

let sanitizedFileName = 'extracted-text';

output.value = '';
downloadButton.disabled = true;
copyButton.disabled = true;

function showAlertBanner(message, type) {
    alertBanner.textContent = message;
    alertBanner.classList.remove('hidden');
    alertBanner.classList.add(type, 'show');
    setTimeout(() => {
        alertBanner.classList.remove(type, 'show');
        setTimeout(() => {
            alertBanner.classList.add('hidden');
        }, 300);
    }, 2000);
}

function sanitizeFileName(filename) {
    const nameWithoutExtension = filename.split('.').slice(0, -1).join('.');
    const sanitized = nameWithoutExtension.replace(/\s+/g, '-').toLowerCase();
    return sanitized;
}

pdfFile.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            pdfFileLabel.textContent = 'Change PDF file';
            fileName.textContent = file.name;
            showAlertBanner('Loading...', 'alert-banner-info');
            downloadButton.disabled = true;
            copyButton.disabled = true;
            sanitizedFileName = sanitizeFileName(file.name);
            const pdf = await pdfjsLib.getDocument({ url: URL.createObjectURL(file) }).promise;
            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const text = content.items.map(item => item.str).join(' ');
                fullText += text + '\n\n';
            }

            fullText = fullText.replace(/[^\x00-\x7F]\s*| {2,}|\n{3,}/g, ' ').trim(); // Remove non-standard characters, emojis, and extra spaces
            output.value = fullText;
            wordCountNum.textContent = fullText.split(/\s+/).length;
            charCountNum.textContent = fullText.length;
            downloadButton.disabled = false;
            copyButton.disabled = false;
            fileName.style.visibility='visible';
            wordCount.style.visibility='visible';
            charCount.style.visibility='visible';
            showAlertBanner('File loaded successfully!', 'alert-banner-success');
        } catch (error) {
            showAlertBanner('Error: Failed to load or process the PDF file.', 'alert-banner-danger');
            pdfFileLabel.textContent = 'Select PDF File';
            fileName.textContent = '';
            output.value = '';
            wordCountNum.textContent = 0;
            charCountNum.textContent = 0;
            downloadButton.disabled = true;
            copyButton.disabled = true;
            fileName.style.visibility='hidden';
            wordCount.style.visibility='hidden';
            charCount.style.visibility='hidden';
        }
    } else {
        pdfFileLabel.textContent = 'Select PDF File';
        fileName.textContent = '';
        output.value = '';
        wordCountNum.textContent = 0;
        charCountNum.textContent = 0;
        downloadButton.disabled = true;
        copyButton.disabled = true;
    }
});

downloadButton.addEventListener('click', () => {
    const blob = new Blob([output.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = sanitizedFileName + '-extracted-text.txt';
    link.click();
    URL.revokeObjectURL(url);
    showAlertBanner('File downloaded successfully!', 'alert-banner-success');
    downloadButton.disabled = true;
});

copyButton.addEventListener('click', async () => {
    try {
      output.focus();
      output.select();
      await navigator.clipboard.writeText(output.value);
      showAlertBanner('Text copied to clipboard!', 'alert-banner-success');
    } catch (err) {
      // Fallback for older browsers
      output.select();
      document.execCommand('copy');
      showAlertBanner('Text copied to clipboard!', 'alert-banner-success');
    }
  });
  
  