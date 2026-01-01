import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = ({ onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    nom_utilisateur: '',
    prenom_utilisateur: '',
    email: '',
    password: '',
    confirmPassword: '',
    numero_tlp: '',
    dateNaissance: '',
    genre: '',
    adresse: '',
    medecin_traitant: '',
    couverture_medicale: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};

    if (!formData.nom_utilisateur.trim()) {
      newErrors.nom_utilisateur = 'Le nom est requis';
    }

    if (!formData.prenom_utilisateur.trim()) {
      newErrors.prenom_utilisateur = 'Le prénom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData.dateNaissance) {
      newErrors.dateNaissance = 'La date de naissance est requise';
    }

    if (!formData.genre) {
      newErrors.genre = 'Le genre est requis';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Créer le nouveau patient
    const newPatient = {
      email: formData.email,
      password: formData.password,
      nom: `${formData.prenom_utilisateur} ${formData.nom_utilisateur}`,
      nom_utilisateur: formData.nom_utilisateur,
      prenom_utilisateur: formData.prenom_utilisateur,
      numero_tlp: formData.numero_tlp || '',
      dateNaissance: formData.dateNaissance,
      genre: formData.genre,
      adresse: formData.adresse || '',
      medecin_traitant: formData.medecin_traitant || '',
      couverture_medicale: formData.couverture_medicale || 'Aucune',
      role: 'patient',
      roles: ['patient'],
      date_inscription: new Date().toISOString().split('T')[0]
    };

    // Sauvegarder dans localStorage pour synchronisation
    const existingPatients = JSON.parse(localStorage.getItem('registeredPatients') || '[]');
    existingPatients.push(newPatient);
    localStorage.setItem('registeredPatients', JSON.stringify(existingPatients));

    // Appeler le callback de succès
    onSuccess(newPatient);

    // Connexion automatique
    import('../utils/auth').then(({ saveCurrentUser }) => {
      saveCurrentUser(newPatient);
      
      // Déclencher la redirection vers le dashboard patient
      setTimeout(() => {
        if (window.onAdminLogin) {
          window.onAdminLogin(newPatient);
        }
      }, 500);
    });
  };

  return (
    <div className="register-form-container">
      <div className="register-header">
        <button className="back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div>
          <h2>Créer un compte patient</h2>
          <p>Remplissez le formulaire ci-dessous</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        {/* Informations personnelles */}
        <div className="form-section">
          <h3>Informations personnelles</h3>
          
          <div className="form-row">
            <div className="form-field">
              <label>Nom *</label>
              <input
                type="text"
                name="nom_utilisateur"
                value={formData.nom_utilisateur}
                onChange={handleChange}
                className={errors.nom_utilisateur ? 'error' : ''}
              />
              {errors.nom_utilisateur && <span className="error-message">{errors.nom_utilisateur}</span>}
            </div>

            <div className="form-field">
              <label>Prénom *</label>
              <input
                type="text"
                name="prenom_utilisateur"
                value={formData.prenom_utilisateur}
                onChange={handleChange}
                className={errors.prenom_utilisateur ? 'error' : ''}
              />
              {errors.prenom_utilisateur && <span className="error-message">{errors.prenom_utilisateur}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-field">
              <label>Téléphone</label>
              <input
                type="tel"
                name="numero_tlp"
                value={formData.numero_tlp}
                onChange={handleChange}
                placeholder="06XXXXXXXX"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Date de naissance *</label>
              <input
                type="date"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleChange}
                className={errors.dateNaissance ? 'error' : ''}
              />
              {errors.dateNaissance && <span className="error-message">{errors.dateNaissance}</span>}
            </div>

            <div className="form-field">
              <label>Genre *</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className={errors.genre ? 'error' : ''}
              >
                <option value="">Sélectionner</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
              {errors.genre && <span className="error-message">{errors.genre}</span>}
            </div>
          </div>

          <div className="form-field">
            <label>Adresse</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Informations médicales */}
        <div className="form-section">
          <h3>Informations médicales</h3>
          
          <div className="form-row">
            <div className="form-field">
              <label>Médecin traitant</label>
              <input
                type="text"
                name="medecin_traitant"
                value={formData.medecin_traitant}
                onChange={handleChange}
                placeholder="Dr. Nom"
              />
            </div>

            <div className="form-field">
              <label>Couverture médicale</label>
              <select
                name="couverture_medicale"
                value={formData.couverture_medicale}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="CNSS">CNSS</option>
                <option value="CNOPS">CNOPS</option>
                <option value="Mutuelle">Mutuelle</option>
                <option value="Assurance privée">Assurance privée</option>
                <option value="Aucune">Aucune</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mot de passe */}
        <div className="form-section">
          <h3>Sécurité</h3>
          
          <div className="form-row">
            <div className="form-field">
              <label>Mot de passe *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Au moins 6 caractères"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-field">
              <label>Confirmer le mot de passe *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>
        </div>

        <button type="submit" className="submit-register-btn">
          Créer mon compte
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;