import React, { useState } from 'react';
import './CongeManager.css';

const CongeManager = ({ demandes, onApprove, onReject, currentUser }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    date_debut: '',
    date_fin: '',
    motif: ''
  });

  const isAdmin = currentUser?.roles?.includes('admin');
  const isEmployee = currentUser?.roles?.includes('employe');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour soumettre une demande de congé
    console.log('Nouvelle demande de congé:', formData);
    setFormData({ date_debut: '', date_fin: '', motif: '' });
    setShowAddForm(false);
  };

  const getStatusBadge = (statut) => {
    const badges = {
      en_attente: { text: 'En attente', class: 'status-pending' },
      accepte: { text: 'Accepté', class: 'status-approved' },
      refuse: { text: 'Refusé', class: 'status-rejected' }
    };
    return badges[statut] || badges.en_attente;
  };

  const calculateDuration = (debut, fin) => {
    const start = new Date(debut);
    const end = new Date(fin);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return days;
  };

  return (
    <div className="conge-manager">
      <div className="conge-header">
        <div>
          <h3>Gestion des Congés</h3>
          <p>{demandes.length} demande(s) de congé</p>
        </div>
        {isEmployee && (
          <button 
            className="btn-demander-conge" 
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Annuler' : '+ Demander un congé'}
          </button>
        )}
      </div>

      {showAddForm && (
        <form className="conge-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label>Date de début *</label>
              <input
                type="date"
                value={formData.date_debut}
                onChange={(e) => setFormData({ ...formData, date_debut: e.target.value })}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-field">
              <label>Date de fin *</label>
              <input
                type="date"
                value={formData.date_fin}
                onChange={(e) => setFormData({ ...formData, date_fin: e.target.value })}
                required
                min={formData.date_debut || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          <div className="form-field">
            <label>Motif *</label>
            <textarea
              value={formData.motif}
              onChange={(e) => setFormData({ ...formData, motif: e.target.value })}
              placeholder="Raison de la demande de congé..."
              rows="3"
              required
            />
          </div>
          <button type="submit" className="btn-submit-conge">
            Soumettre la demande
          </button>
        </form>
      )}

      <div className="conges-list">
        {demandes.length === 0 ? (
          <div className="empty-state">
            <p>Aucune demande de congé</p>
          </div>
        ) : (
          demandes.map(demande => {
            const badge = getStatusBadge(demande.statut);
            const duration = calculateDuration(demande.date_debut, demande.date_fin);
            
            return (
              <div key={demande.id_conge} className="conge-card">
                <div className="conge-info">
                  <div className="conge-dates">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <div>
                      <strong>
                        {new Date(demande.date_debut).toLocaleDateString('fr-FR')} 
                        {' → '}
                        {new Date(demande.date_fin).toLocaleDateString('fr-FR')}
                      </strong>
                      <span className="duration">{duration} jour(s)</span>
                    </div>
                  </div>
                  <p className="conge-motif">{demande.motif}</p>
                  <span className={`status-badge ${badge.class}`}>
                    {badge.text}
                  </span>
                </div>

                {isAdmin && demande.statut === 'en_attente' && (
                  <div className="conge-actions">
                    <button 
                      className="btn-approve"
                      onClick={() => onApprove(demande.id_conge)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Accepter
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => onReject(demande.id_conge)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                      Refuser
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CongeManager;