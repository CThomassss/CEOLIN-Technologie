// Configuration EmailJS (remplacez par vos propres clés après inscription sur emailjs.com)
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // À remplacer
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // À remplacer
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // À remplacer

// Initialiser EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// Fonction pour afficher le popup de succès
function showSuccessPopup() {
    // Créer le popup
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    popup.innerHTML = `
        <div class="bg-white rounded-lg p-6 m-4 max-w-sm w-full transform transition-all duration-300 scale-95">
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <i class="fas fa-check text-green-600 text-xl"></i>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Message envoyé !</h3>
                <p class="text-sm text-gray-500 mb-4">Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.</p>
                <button onclick="closePopup()" class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                    Parfait !
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Animation d'apparition
    setTimeout(() => {
        popup.querySelector('div > div').classList.remove('scale-95');
        popup.querySelector('div > div').classList.add('scale-100');
    }, 10);
}

// Fonction pour afficher le popup d'erreur
function showErrorPopup() {
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    popup.innerHTML = `
        <div class="bg-white rounded-lg p-6 m-4 max-w-sm w-full transform transition-all duration-300 scale-95">
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">Erreur d'envoi</h3>
                <p class="text-sm text-gray-500 mb-4">Une erreur est survenue lors de l'envoi. Veuillez réessayer ou me contacter directement.</p>
                <button onclick="closePopup()" class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                    Compris
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.querySelector('div > div').classList.remove('scale-95');
        popup.querySelector('div > div').classList.add('scale-100');
    }, 10);
}

// Fonction pour fermer le popup
function closePopup() {
    const popup = document.querySelector('.fixed.inset-0');
    if (popup) {
        popup.remove();
    }
}

// Fonction principale d'envoi de message
function sendMessage() {
    // Récupérer les valeurs du formulaire
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation basique
    if (!name || !email || !message) {
        alert('Veuillez remplir tous les champs obligatoires (nom, email, message).');
        return;
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }
    
    // Changer le bouton en état de chargement
    const button = document.querySelector('button[onclick="sendMessage()"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
    button.disabled = true;
    
    // Préparer les données pour EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phone || 'Non renseigné',
        subject: subject || 'Nouvelle demande de contact',
        message: message,
        to_email: 'tceolin1710@gmail.com' // Votre email de réception
    };
    
    // Version alternative sans EmailJS (pour test immédiat)
    // Simuler l'envoi avec un délai
    setTimeout(() => {
        // Restaurer le bouton
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Afficher le popup de succès
        showSuccessPopup();
        
        // Réinitialiser le formulaire
        document.querySelector('form').reset();
        
        // Log pour debug (à supprimer en production)
        console.log('Message envoyé:', templateParams);
    }, 2000);
    
    /* 
    // Code EmailJS (à décommenter quand configuré)
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            
            // Restaurer le bouton
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Afficher le popup de succès
            showSuccessPopup();
            
            // Réinitialiser le formulaire
            document.querySelector('form').reset();
            
        }, (error) => {
            console.log('FAILED...', error);
            
            // Restaurer le bouton
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Afficher le popup d'erreur
            showErrorPopup();
        });
    */
}

// Fermer popup avec Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});
