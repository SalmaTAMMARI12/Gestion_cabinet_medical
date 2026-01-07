import React, { useState } from 'react';
import './MedecinDashboard.css';
import MesConges from './MesConges'; 
import VisiteMedicaleModal from './VisiteMedicaleModal';

const MedecinDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('planning');
  const [searchTerm, setSearchTerm] = useState(''); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const today = new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  const [patientsList] = useState([
    { id: 1, id_patient: 'P001', id_dossier: '2026-001', patient: 'Ahmed Alami', cin: 'BE123456', derniereVisite: '07 Janvier 2026', status: 'En cours' },
    { id: 2, id_patient: 'P002', id_dossier: '2026-002', patient: 'Sara Benali', cin: 'CD987654', derniereVisite: '05 Janvier 2026', status: 'Terminé' },
  ]);

  const planningData = [
    { id: 1, id_patient: 'P001', id_dossier: '2026-001', heure: '09:00', patient: 'Ahmed Alami', type: 'Consultation générale', status: 'Confirmé' },
    { id: 2, id_patient: 'P002', id_dossier: '2026-002', heure: '10:30', patient: 'Sara Benali', type: 'Électrocardiogramme (ECG)', status: 'En attente' }
  ];

  const handleOpenDossier = (patientInfo) => {
    setSelectedPatient({
      nom: patientInfo.patient,
      id_patient: patientInfo.id_patient,
      id_dossier: patientInfo.id_dossier
    });
    setIsModalOpen(true);
  };

  const filteredPatients = patientsList.filter(p => 
    p.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.cin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="medecin-dashboard">
      <aside className="medecin-sidebar">
        <div className="medecin-logo-section">
          <div className="logo-box-turquoise">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
               <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
             </svg>
          </div>
          <div className="logo-text-admin">Espace<br/><span>Médecin</span></div>
        </div>

        <nav className="medecin-nav">
          <button className={`nav-item-admin ${activeTab === 'planning' ? 'active' : ''}`} onClick={() => setActiveTab('planning')}>Mon Planning</button>
          <button className={`nav-item-admin ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => setActiveTab('patients')}>Mes Patients</button>
          <button className={`nav-item-admin ${activeTab === 'conges' ? 'active' : ''}`} onClick={() => setActiveTab('conges')}>Mes Congés</button>
        </nav>

        <button className="btn-logout-admin" onClick={onLogout}>
           <span style={{marginRight: '8px'}}>↳</span> Déconnexion
        </button>
      </aside>

      <main className="medecin-main-content">
        <header className="medecin-header-top">
          <div className="header-left">
            <h1 className="welcome-title">Bienvenue, {user?.nom || "Benali"}</h1>
            <p className="current-date">Aujourd'hui : {today}</p>
          </div>

        </header>

        <div className="content-container">
          {activeTab === 'planning' && (
             <div className="planning-grid-container">
                <h2 className="section-subtitle">Planning du jour</h2>
                <div className="planning-list">
                  {planningData.map((rdv) => (
                    <div key={rdv.id} className="rdv-card-admin">
                      <div className="rdv-time-info"><span className="rdv-hour">{rdv.heure}</span></div>
                      <div className="rdv-patient-info">
                        <h4>{rdv.patient}</h4>
                        <p>{rdv.type}</p>
                      </div>
                      <div className={`rdv-status-badge ${rdv.status === 'Confirmé' ? 'confirmed' : 'pending'}`}>{rdv.status}</div>
                      <div className="rdv-actions">
                        <button className="btn-dossier-dark" onClick={() => handleOpenDossier(rdv)}>Commencer visite</button>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          )}

          {activeTab === 'patients' && (
            <div className="patients-page-container">
                <div className="page-header-actions">
                    <h2 className="section-subtitle">Base Patients</h2>
                    <div className="search-bar-container">
                        <span className="search-icon">🔍</span>
                        <input 
                          type="text" 
                          placeholder="Rechercher par nom ou CIN..." 
                          className="patient-search-input"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="patients-list-wrapper">
                    <table className="patients-table">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>CIN</th>
                                <th>Dernière Visite</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div className="patient-info-cell">
                                            <div className="avatar-circle">{p.patient.substring(0, 2).toUpperCase()}</div>
                                            <span className="patient-name">{p.patient}</span>
                                        </div>
                                    </td>
                                    <td><span className="id-badge">{p.cin}</span></td>
                                    <td>{p.derniereVisite}</td>
                                    <td><span className={`status-tag ${p.status === 'En cours' ? 'tag-active' : ''}`}>{p.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          )}

          {activeTab === 'conges' && <MesConges />}
        </div>
      </main>

      <VisiteMedicaleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        patient={selectedPatient}
      />
    </div>
  );
};

export default MedecinDashboard;