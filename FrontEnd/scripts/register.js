import { showError } from "./config.js"
import { Logout } from './Logout.js'

const Register = async (type) => {
    try {
        // Get form data based on registration type
        let formData;
        
        if (type === 'volanteaire') {
            formData = {
                username: document.getElementById('VolanteaireUsername').value,
                firstName: document.getElementById('VolanteaireFirstName').value,
                lastName: document.getElementById('VolanteaireLastName').value,
                age: document.getElementById('AgeVolanteaire').value,
                cin: document.getElementById('CINVolanteaire').value,
                email: document.getElementById('EmailVolanteaire').value,
                password: document.getElementById('passwordVolanteaire').value,
                phone: document.getElementById('telVolanteaire').value,
                location: document.getElementById('LocationVolanteaire').value
            };
        } else if (type === 'Association') {
            formData = {
                name: document.getElementById('NameAssociation').value,
                phone: document.getElementById('telAssociation').value,
                location: document.getElementById('LocationAssociation').value,
                specialite: document.getElementById('specialiteAssociation').value,
                email: document.getElementById('EmailAssociation').value,
                password: document.getElementById('Association').value
            };
        }

        // Validate that all fields are filled
        for (let field in formData) {
            if (!formData[field]) {
                throw new Error('Please fill in all fields');
            }
        }
        
        // Make API call
        const response = await fetch(`api/${type}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        Logout()
        return data;

    } catch (error) {
        showError(error)
    }
};

// Event listeners for the buttons
document.getElementById('btnVolanteaire').addEventListener('click', () => Register('volanteaire'));
document.getElementById('btnAssociation').addEventListener('click', () => Register('Association'));
