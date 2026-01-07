import React, { useState } from 'react';
import './VisiteMedicaleModal.css';
import PrescriptionView from './PrescriptionView';

const VisiteMedicaleModal = ({ isOpen, onClose, patient }) => {
  const [activeTab, setActiveTab] = useState('visite');
  const [activeHistorySubTab, setActiveHistorySubTab] = useState('vaccins');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPrescription, setShowPrescription] = useState(false);

  const [selectedActes, setSelectedActes] = useState([]);
  const [currentActe, setCurrentActe] = useState("");

  const [historyData, setHistoryData] = useState({
    vaccins: [],
    allergies: [],
    maladies: []
  });

  const [formInput, setFormInput] = useState({ f1: '', f2: '', f3: '' });

  const catalogueActes = [
    { id: 1, nom: "Consultation générale", tarif: 300 },
    { id: 2, nom: "Électrocardiogramme (ECG)", tarif: 500 },
    { id: 3, nom: "Échographie", tarif: 800 }
  ];

  const handleAddHistoryRow = () => {
    if (!formInput.f1) return;
    const newEntry = {
      id: Date.now(),
      col1: formInput.f1,
      col2: formInput.f2,
      col3: formInput.f3
    };
    setHistoryData({
      ...historyData,
      [activeHistorySubTab]: [...historyData[activeHistorySubTab], newEntry]
    });
    setFormInput({ f1: '', f2: '', f3: '' });
    setShowAddForm(false);
  };

  if (!isOpen || !patient) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <header className="modal-header">
          <h2>Dossier de : {patient.nom}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </header>

        <nav className="modal-nav">
          <button className={activeTab === 'visite' ? 'active' : ''} onClick={() => {setActiveTab('visite'); setShowPrescription(false);}}>Visite en cours</button>
          <button className={activeTab === 'historique' ? 'active' : ''} onClick={() => setActiveTab('historique')}>Dossier Médical</button>
        </nav>

        <div className="modal-body">
          {activeTab === 'visite' && (
            <>
              {!showPrescription ? (
                <div className="visit-grid">
                  <section className="visit-box">
                    <h3 className="section-title">Paramètres Vitaux</h3>
                    <div className="input-group"><label>Poids (kg)</label><input type="number" placeholder="70.0" /></div>
                    <div className="input-group"><label>Température (°C)</label><input type="number" placeholder="37.0" /></div>
                    <div className="input-group"><label>Tension Max/Min</label><div className="tension-row"><input placeholder="Max" /><input placeholder="Min" /></div></div>
                  </section>

                  <section className="visit-box">
                    <h3 className="section-title">Diagnostic & Examens</h3>
                    <div className="input-group"><label>Symptômes</label><input placeholder="Symptômes..." /></div>
                    <div className="input-group"><label>Observations</label><textarea rows="2"></textarea></div>
                    <div className="input-group"><label>Tests (Analyses/Radio)</label><input placeholder="NFS, Radio..." /></div>
                  </section>

                  <section className="visit-box full-width">
                    <h3 className="section-title">Actes Réalisés</h3>
                    <div className="act-selection-area">
                      <select className="catalog-dropdown" value={currentActe} onChange={(e) => setCurrentActe(e.target.value)}>
                        <option value="">Sélectionner un acte...</option>
                        {catalogueActes.map(acte => <option key={acte.id} value={acte.nom}>{acte.nom}</option>)}
                      </select>
                      <button className="btn-confirm-act" onClick={() => currentActe && setSelectedActes([...selectedActes, currentActe])}>Ajouter</button>
                    </div>
                    <div className="selected-acts-container">
                      {selectedActes.map((acte, i) => <span key={i} className="acte-tag">{acte}</span>)}
                    </div>
                  </section>

                  <div className="full-width centered-btn-area">
                    <button className="btn-prescription" onClick={() => setShowPrescription(true)}>Rédiger l'Ordonnance</button>
                  </div>
                </div>
              ) : (
                <PrescriptionView onBack={() => setShowPrescription(false)} />
              )}
            </>
          )}

          {activeTab === 'historique' && (
            <div className="history-container">
              <aside className="history-sidebar">
                <div className="dossier-info-box"><span className="info-label">DOSSIER CRÉÉ LE:</span><span className="info-value">12/05/2024</span></div>
                <button className={activeHistorySubTab === 'vaccins' ? 'active' : ''} onClick={() => setActiveHistorySubTab('vaccins')}>Vaccins</button>
                <button className={activeHistorySubTab === 'allergies' ? 'active' : ''} onClick={() => setActiveHistorySubTab('allergies')}>Allergies</button>
                <button className={activeHistorySubTab === 'maladies' ? 'active' : ''} onClick={() => setActiveHistorySubTab('maladies')}>Maladies Chroniques</button>
              </aside>
              
              <div className="history-content">
                <div className="content-header-history">
                  <h3 className="subtab-title">{activeHistorySubTab.toUpperCase()}</h3>
                  <button className="btn-add-history" onClick={() => setShowAddForm(!showAddForm)}>{showAddForm ? "Annuler" : "+ Ajouter"}</button>
                </div>

                {showAddForm && (
                  <div className="quick-add-form">
                    {/* CHAMPS ADAPTÉS AUX NOMS DES COLONNES */}
                    {activeHistorySubTab === 'vaccins' && (
                      <>
                        <input placeholder="NOM VACCIN" value={formInput.f1} onChange={e => setFormInput({...formInput, f1: e.target.value})} />
                        <input type="date" value={formInput.f2} onChange={e => setFormInput({...formInput, f2: e.target.value})} />
                        <input placeholder="DOSE" value={formInput.f3} onChange={e => setFormInput({...formInput, f3: e.target.value})} />
                      </>
                    )}
                    {activeHistorySubTab === 'allergies' && (
                      <>
                        <input placeholder="ALLERGIE" value={formInput.f1} onChange={e => setFormInput({...formInput, f1: e.target.value})} />
                        <input placeholder="TYPE" value={formInput.f2} onChange={e => setFormInput({...formInput, f2: e.target.value})} />
                        <input placeholder="MÉDICATION" value={formInput.f3} onChange={e => setFormInput({...formInput, f3: e.target.value})} />
                      </>
                    )}
                    {activeHistorySubTab === 'maladies' && (
                      <>
                        <input placeholder="MALADIE" value={formInput.f1} onChange={e => setFormInput({...formInput, f1: e.target.value})} />
                        <input type="date" value={formInput.f2} onChange={e => setFormInput({...formInput, f2: e.target.value})} />
                        <input placeholder="STADE/INFO" value={formInput.f3} onChange={e => setFormInput({...formInput, f3: e.target.value})} />
                      </>
                    )}
                    <button className="btn-ok-row" onClick={handleAddHistoryRow}>OK</button>
                  </div>
                )}

                <table className="mld-table">
                  <thead>
                    {activeHistorySubTab === 'vaccins' && <tr><th>NOM</th><th>DATE</th><th>DOSE</th></tr>}
                    {activeHistorySubTab === 'allergies' && <tr><th>ALLERGIE</th><th>TYPE</th><th>MÉDICATION</th></tr>}
                    {activeHistorySubTab === 'maladies' && <tr><th>MALADIE</th><th>DATE DIAG.</th><th>STADE/INFO</th></tr>}
                  </thead>
                  <tbody>
                    {historyData[activeHistorySubTab].map(item => (
                      <tr key={item.id}><td>{item.col1}</td><td>{item.col2}</td><td>{item.col3}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <footer className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Annuler</button>
          <button className="btn-primary">Enregistrer la Visite</button>
        </footer>
      </div>
    </div>
  );
};

export default VisiteMedicaleModal;