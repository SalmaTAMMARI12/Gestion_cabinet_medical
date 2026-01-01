import React, { useState } from 'react';
import './PatientDashboard.css';

const PatientDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('mon-agenda');
  

  // Données de démonstration
  const patientData = {
    medecinTraitant: {
      nom: 'Dr. Benali',
      specialite: 'Cardiologue',
      email: 'k.benali@cabinet.fr',
      telephone: '0612345678'
    },
    rdvActuel: {
      id: 1,
      date: '2025-01-15',
      heure: '10:00',
      medecin: 'Dr. Benali',
      type: 'Consultation',
      statut: 'confirme'
    },
    derniereVisite: {
      date: '2024-12-20',
      delaiControle: 11 // jours depuis dernière visite
    }
  };

  const visites = [
    {
      id: 1,
      date: '2024-12-20',
      medecin: 'Dr. Benali',
      type: 'Consultation',
      diagnostic: 'Contrôle tension artérielle',
      actes: ['Consultation générale', 'ECG'],
      prescriptions: [
        { type: 'Médicament', nom: 'Amlodipine 5mg', posologie: '1 comprimé/jour le matin' },
        { type: 'Analyse', nom: 'Bilan lipidique', posologie: 'À jeun' }
      ]
    },
    {
      id: 2,
      date: '2024-11-10',
      medecin: 'Dr. Benali',
      type: 'Consultation',
      diagnostic: 'Hypertension artérielle',
      actes: ['Consultation générale'],
      prescriptions: [
        { type: 'Médicament', nom: 'Amlodipine 5mg', posologie: '1 comprimé/jour' }
      ]
    }
  ];

  const factures = [
    {
      id: 1,
      numero: 'F-2024-001',
      date: '2024-12-20',
      montant_total: 800,
      montant_paye: 800,
      statut: 'payee',
      paiements: [
        { date: '2024-12-20', montant: 800, mode: 'Carte bancaire' }
      ]
    },
    {
      id: 2,
      numero: 'F-2024-002',
      date: '2024-11-10',
      montant_total: 300,
      montant_paye: 150,
      statut: 'partielle',
      paiements: [
        { date: '2024-11-10', montant: 150, mode: 'Espèces' }
      ]
    }
  ];

  const peutPrendreControle = patientData.derniereVisite.delaiControle <= 15;
  const aDejaRDV = patientData.rdvActuel !== null;

  return (
    <div className="patient-dashboard">
      {/* Sidebar */}
      <aside className="patient-sidebar">
        <div className="patient-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="white">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <span>Espace Patient</span>
        </div>

        <nav className="patient-nav">
          <button 
            className={`nav-btn ${activeTab === 'mon-agenda' ? 'active' : ''}`}
            onClick={() => setActiveTab('mon-agenda')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Mon Agenda
          </button>

          <button 
            className={`nav-btn ${activeTab === 'prendre-rdv' ? 'active' : ''}`}
            onClick={() => setActiveTab('prendre-rdv')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Prendre RDV
          </button>

          <button 
            className={`nav-btn ${activeTab === 'mes-visites' ? 'active' : ''}`}
            onClick={() => setActiveTab('mes-visites')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Mes Visites
          </button>

          <button 
            className={`nav-btn ${activeTab === 'mes-factures' ? 'active' : ''}`}
            onClick={() => setActiveTab('mes-factures')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Mes Factures
          </button>

          <button 
            className={`nav-btn ${activeTab === 'mon-medecin' ? 'active' : ''}`}
            onClick={() => setActiveTab('mon-medecin')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            Mon Médecin
          </button>
        </nav>

        <button className="logout-btn" onClick={onLogout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <main className="patient-main">
        <header className="patient-header">
          <div>
            <h1>Bonjour, {user?.prenom_utilisateur || user?.nom} </h1>
            <p>Gérez vos rendez-vous et suivez votre santé</p>
          </div>
          <div className="user-profile">
            <div className="profile-avatar">
              {user?.prenom_utilisateur?.charAt(0) || user?.nom?.charAt(0) || 'P'}
            </div>
            <span>{user?.prenom_utilisateur} {user?.nom_utilisateur}</span>
          </div>
        </header>

        <div className="patient-content">
          {/* Mon Agenda */}
          {activeTab === 'mon-agenda' && (
            <div className="page-section">
              <h2> Mon Agenda</h2>
              
              {aDejaRDV ? (
                <div className="rdv-actuel-card">
                  <div className="rdv-header">
                    <h3>Votre prochain rendez-vous</h3>
                    <span className="rdv-status confirme">Confirmé</span>
                  </div>
                  <div className="rdv-details-box">
                    <div className="rdv-info-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <div>
                        <span className="label">Date</span>
                        <strong>{new Date(patientData.rdvActuel.date).toLocaleDateString('fr-FR', { 
                          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
                        })}</strong>
                      </div>
                    </div>
                    <div className="rdv-info-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <div>
                        <span className="label">Heure</span>
                        <strong>{patientData.rdvActuel.heure}</strong>
                      </div>
                    </div>
                    <div className="rdv-info-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <div>
                        <span className="label">Médecin</span>
                        <strong>{patientData.rdvActuel.medecin}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="rdv-actions">
                    <button className="btn-action modifier">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Modifier
                    </button>
                    <button className="btn-action annuler">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="no-rdv-card">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <p>Vous n'avez aucun rendez-vous prévu</p>
                  <button className="btn-prendre-rdv" onClick={() => setActiveTab('prendre-rdv')}>
                    Prendre un rendez-vous
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Prendre RDV */}
          {activeTab === 'prendre-rdv' && (
            <div className="page-section">
              <h2> Prendre un Rendez-vous</h2>
              
              {aDejaRDV ? (
                <div className="alert-warning">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <div>
                    <strong>Vous avez déjà un rendez-vous</strong>
                    <p>Vous ne pouvez prendre qu'un seul rendez-vous à la fois. Veuillez annuler votre rendez-vous actuel pour en prendre un nouveau.</p>
                  </div>
                </div>
              ) : (
                <div className="rdv-form-container">
                  {peutPrendreControle && (
                    <div className="alert-info">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12.01" y2="8"/>
                      </svg>
                      <div>
                        <strong>Contrôle gratuit disponible !</strong>
                        <p>Votre dernière visite date de moins de 15 jours. Vous pouvez bénéficier d'un contrôle gratuit.</p>
                      </div>
                    </div>
                  )}

                  <form className="rdv-form">
                    <div className="form-row">
                      <div className="form-field">
                        <label>Type de visite *</label>
                        <select required>
                          <option value="visite_simple">Visite simple</option>
                          {peutPrendreControle && <option value="controle">Contrôle (Gratuit)</option>}
                        </select>
                      </div>
                      <div className="form-field">
                        <label>Médecin *</label>
                        <select required>
                          <option value="">Sélectionner un médecin</option>
                          <option value="1">Dr. Benali - Cardiologue</option>
                          <option value="2">Dr. Chakir - Dermatologue</option>
                          <option value="3">Dr. Alami - Généraliste</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label>Date souhaitée *</label>
                        <input 
                          type="date" 
                          required 
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="form-field">
                        <label>Créneau horaire *</label>
                        <select required>
                          <option value="">Sélectionner un créneau</option>
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Motif de consultation (optionnel)</label>
                      <textarea 
                        rows="3" 
                        placeholder="Décrivez brièvement la raison de votre visite..."
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-submit-rdv">
                      Confirmer le rendez-vous
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Mes Visites */}
          {activeTab === 'mes-visites' && (
            <div className="page-section">
              <h2>🩺 Historique de mes Visites</h2>
              
              <div className="visites-timeline">
                {visites.map(visite => (
                  <div key={visite.id} className="visite-card">
                    <div className="visite-date-badge">
                      {new Date(visite.date).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="visite-content">
                      <div className="visite-header-info">
                        <h3>{visite.medecin}</h3>
                        <span className="visite-type">{visite.type}</span>
                      </div>
                      <p className="visite-diagnostic">{visite.diagnostic}</p>
                      
                      <div className="visite-section">
                        <strong>Actes effectués :</strong>
                        <div className="actes-tags">
                          {visite.actes.map((acte, i) => (
                            <span key={i} className="acte-tag">{acte}</span>
                          ))}
                        </div>
                      </div>

                      {visite.prescriptions.length > 0 && (
                        <div className="visite-section">
                          <strong>Prescriptions :</strong>
                          <div className="prescriptions-list">
                            {visite.prescriptions.map((presc, i) => (
                              <div key={i} className="prescription-item">
                                <div className="presc-icon">
                                  {presc.type === 'Médicament' && '💊'}
                                  {presc.type === 'Analyse' && '🔬'}
                                  {presc.type === 'Radio' && '🩻'}
                                </div>
                                <div className="presc-details">
                                  <strong>{presc.nom}</strong>
                                  <span>{presc.posologie}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mes Factures */}
          {activeTab === 'mes-factures' && (
            <div className="page-section">
              <h2>💳 Mes Factures</h2>
              
              <div className="factures-patient-grid">
                {factures.map(facture => {
                  const reste = facture.montant_total - facture.montant_paye;
                  return (
                    <div key={facture.id} className="facture-patient-card">
                      <div className="facture-header-section">
                        <div>
                          <h3>{facture.numero}</h3>
                          <span className="facture-date">
                            {new Date(facture.date).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <span className={`facture-status ${facture.statut}`}>
                          {facture.statut === 'payee' ? '✅ Payée' : 
                           facture.statut === 'partielle' ? '⏳ Partielle' : '❌ Impayée'}
                        </span>
                      </div>

                      <div className="facture-montants">
                        <div className="montant-row">
                          <span>Montant total :</span>
                          <strong className="montant-total">{facture.montant_total} MAD</strong>
                        </div>
                        <div className="montant-row">
                          <span>Déjà payé :</span>
                          <strong className="montant-paye">{facture.montant_paye} MAD</strong>
                        </div>
                        {reste > 0 && (
                          <div className="montant-row reste">
                            <span>Reste à payer :</span>
                            <strong className="montant-reste">{reste} MAD</strong>
                          </div>
                        )}
                      </div>

                      <div className="paiements-historique">
                        <strong>Historique des paiements :</strong>
                        {facture.paiements.map((paiement, i) => (
                          <div key={i} className="paiement-item">
                            <span className="paiement-date">
                              {new Date(paiement.date).toLocaleDateString('fr-FR')}
                            </span>
                            <span className="paiement-montant">{paiement.montant} MAD</span>
                            <span className="paiement-mode">{paiement.mode}</span>
                          </div>
                        ))}
                      </div>

                      {reste > 0 && (
                        <button className="btn-payer">
                          Effectuer un paiement
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mon Médecin */}
          {activeTab === 'mon-medecin' && (
            <div className="page-section">
              <h2> Mon Médecin Traitant</h2>
              
              <div className="medecin-traitant-card">
                <div className="medecin-avatar-large">
                  {patientData.medecinTraitant.nom.split(' ')[1].charAt(0)}
                </div>
                <div className="medecin-info-section">
                  <h3>{patientData.medecinTraitant.nom}</h3>
                  <p className="medecin-specialite">{patientData.medecinTraitant.specialite}</p>
                  
                  <div className="medecin-contact">
                    <div className="contact-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      <span>{patientData.medecinTraitant.email}</span>
                    </div>
                    <div className="contact-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                      </svg>
                      <span>{patientData.medecinTraitant.telephone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;