document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const matricula = document.getElementById('matricula').value;

    if (!name || !email || !matricula) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido!');
        return;
    }

    const qrData = JSON.stringify({ name, email, matricula });

    // Gera QR Code no Canvas
    const qrCanvas = document.createElement('canvas');
    new QRious({
        element: qrCanvas,
        value: qrData,
        size: 256, // Tamanho do QR Code
        background: 'white',
        foreground: 'black'
    });

    // Exibe o QR Code
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = ''; 
    qrcodeDiv.appendChild(qrCanvas);

    document.getElementById('popup-container').style.display = 'flex';
});

document.getElementById('download-qr').addEventListener('click', function() {
    const qrCanvas = document.getElementById('qrcode').querySelector('canvas');
    
    if (!qrCanvas) {
        alert('QR Code não gerado.');
        return;
    }

    // Cria um link para download
    const link = document.createElement('a');
    link.href = qrCanvas.toDataURL('image/png');
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
