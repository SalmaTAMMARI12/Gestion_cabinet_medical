import React, { useState, useEffect } from 'react';
import HistoriqueVisites from './HistoriqueVisites';
import './AdminDashboard.css';
import CalendrierConges from './CalendrierConges';
import AddPatientModal from '../components/AddPatientModal';
import AddEmployeeModal from '../components/AddEmployeeModal';
import ActesMedicauxManager from '../components/ActesMedicauxManager';
import CongeManager from '../components/CongeManager';
import { initialData } from '../utils/database';
import FacturesManager from './FacturesManager';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      nom_utilisateur: 'Benali', 
      prenom_utilisateur: 'Karim', 
      email: 'k.benali@cabinet.fr', 
      role: 'medecin', 
      specialite: 'Cardiologue', 
      numero_tlp: '0612345678',
      salaire: 15000,
      statut: 'actif'
    },
    { 
      id: 2, 
      nom_utilisateur: 'Alami', 
      prenom_utilisateur: 'Fatima', 
      email: 'f.alami@cabinet.fr', 
      role: 'employe', 
      numero_tlp: '0623456789',
      salaire: 8000,
      statut: 'actif'
    },
  ]);

  const [patients, setPatients] = useState([
    { 
      id: 1, 
      nom_utilisateur: 'Alami', 
      prenom_utilisateur: 'Ahmed', 
      email: 'ahmed.alami@gmail.com', 
      numero_tlp: '0612345678', 
      dateNaissance: '1985-03-15',
      genre: 'Homme',
      medecin_traitant: 'Dr. Benali',
      couverture_medicale: 'CNSS',
      date_inscription: '2024-12-20'
    },
  ]);

  // Charger les patients enregistrés depuis localStorage
  useEffect(() => {
    const registeredPatients = JSON.parse(localStorage.getItem('registeredPatients') || '[]');
    
    if (registeredPatients.length > 0) {
      setPatients(prevPatients => {
        const existingEmails = prevPatients.map(p => p.email);
        const newPatients = registeredPatients
          .filter(rp => !existingEmails.includes(rp.email))
          .map((rp, index) => ({
            id: prevPatients.length + index + 1,
            ...rp
          }));
        
        return [...prevPatients, ...newPatients];
      });
    }
  }, []);

  // Écouter les nouveaux patients en temps réel
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'registeredPatients') {
        const registeredPatients = JSON.parse(e.newValue || '[]');
        
        setPatients(prevPatients => {
          const existingEmails = prevPatients.map(p => p.email);
          const newPatients = registeredPatients
            .filter(rp => !existingEmails.includes(rp.email))
            .map((rp, index) => ({
              id: prevPatients.length + index + 1,
              ...rp
            }));
          
          return [...prevPatients, ...newPatients];
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Calcul dynamique des revenus
  const facturesPourStats = [
    { montant_paye: 800 },
    { montant_paye: 150 },
    { montant_paye: 1200 },
    { montant_paye: 300 }
  ];

  const totalRevenus = facturesPourStats.reduce((sum, f) => sum + f.montant_paye, 0);

  // Stats calculées dynamiquement
  const stats = [
    { title: 'Patients', value: patients.length.toString(), icon: '👥', change: 'Total enregistrés', color: '#3EAEB1' },
    { title: 'Employés', value: employees.length.toString(), icon: '👨‍⚕️', change: 'Actifs', color: '#61BACA' },
    { title: 'Rendez-vous', value: '89', icon: '📅', change: 'Aujourd\'hui', color: '#9CD1CE' },
    { title: 'Revenus', value: `${totalRevenus.toLocaleString()} MAD`, icon: '💰', change: 'Total encaissé', color: '#1D837F' }
  ];

  const recentPatients = patients.slice(-4).reverse();

  const recentAppointments = [
    { id: 1, patient: 'Alami Ahmed', medecin: 'Dr. Benali', date: '2024-12-30', heure: '10:00', statut: 'Confirmé', type: 'Consultation' },
    { id: 2, patient: 'Benali Sara', medecin: 'Dr. Chakir', date: '2024-12-30', heure: '11:30', statut: 'En attente', type: 'Contrôle' },
    { id: 3, patient: 'Chakir Mohamed', medecin: 'Dr. Alami', date: '2024-12-31', heure: '14:00', statut: 'Confirmé', type: 'Consultation' },
    { id: 4, patient: 'Driouech Fatima', medecin: 'Dr. Benali', date: '2024-12-31', heure: '15:30', statut: 'Confirmé', type: 'Suivi' }
  ];

  const [actesMedicaux, setActesMedicaux] = useState(initialData.actesMedicaux);
  const [demandesConge, setDemandesConge] = useState(initialData.demandesConge);

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet employé ?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleEditEmployee = (emp) => {
    setEditingEmployee(emp); 
    setShowAddEmployee(true);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
          </div>
          <span>Admin Panel</span>
        </div>

        <nav className="admin-nav">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </button>

          <button 
            className={`nav-btn ${activeTab === 'patients' ? 'active' : ''}`}
            onClick={() => setActiveTab('patients')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Patients
          </button>

          <button 
            className={`nav-btn ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Employés
          </button>

          <button 
            className={`nav-btn ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Rendez-vous
          </button>

          <button 
            className={`nav-btn ${activeTab === 'conges' ? 'active' : ''}`}
            onClick={() => setActiveTab('conges')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Congés
          </button>

          <button 
            className={`nav-btn ${activeTab === 'calendrier' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendrier')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Calendrier
          </button>

          <button 
            className={`nav-btn ${activeTab === 'actes' ? 'active' : ''}`}
            onClick={() => setActiveTab('actes')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Actes Médicaux
          </button>

          <button 
            className={`nav-btn ${activeTab === 'factures' ? 'active' : ''}`}
            onClick={() => setActiveTab('factures')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
            </svg>
            Factures
          </button>

          <button 
            className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m8.66-13.66l-4.24 4.24m-5.66 5.66l-4.24 4.24M23 12h-6m-6 0H1m20.66 8.66l-4.24-4.24m-5.66-5.66l-4.24-4.24"/>
            </svg>
            Paramètres
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
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Bienvenue, {user?.nom || 'Admin'}</h1>
            <p>Gérez votre cabinet médical</p>
          </div>
          <div className="quick-actions">
            {user?.roles?.includes('secretaire') && (
              <>
                <button className="quick-action-btn" onClick={() => alert('Fonction Rendez-vous à venir')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                  Nouveau RDV
                </button>
                <button className="quick-action-btn" onClick={() => setShowAddPatient(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <line x1="20" y1="8" x2="20" y2="14"/>
                    <line x1="23" y1="11" x2="17" y2="11"/>
                  </svg>
                  Nouveau Patient
                </button>
              </>
            )}

            {user?.roles?.includes('admin') && (
              <button className="quick-action-btn" onClick={() => setShowAddEmployee(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Nouvel Employé
              </button>
            )}

            {!user?.roles?.includes('admin') && !user?.roles?.includes('secretaire') && (
              <div className="no-actions-message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <span>Bienvenue dans votre espace</span>
              </div>
            )}
          </div>

          <div className="header-actions">
            <button className="notification-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <div className="profile-avatar">
                {user?.nom_utilisateur?.charAt(0) || user?.nom?.charAt(0) || 'A'}
              </div>
              <span>{user?.nom || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content">
          {activeTab === 'dashboard' && (
            <>
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card" style={{ borderTopColor: stat.color }}>
                    <div className="stat-icon" style={{ background: `${stat.color}15` }}>
                      <span style={{ color: stat.color }}>{stat.icon}</span>
                    </div>
                    <div className="stat-details">
                      <h3>{stat.title}</h3>
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-change">{stat.change}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dashboard-grid">
                <div className="dashboard-card">
                  <div className="card-header">
                    <h2>Patients Récents</h2>
                    <button className="view-all-btn" onClick={() => setActiveTab('patients')}>Voir tout</button>
                  </div>
                  <div className="table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Nom</th>
                          <th>Email</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPatients.map(patient => (
                          <tr key={patient.id}>
                            <td><strong>{patient.prenom_utilisateur} {patient.nom_utilisateur}</strong></td>
                            <td>{patient.email}</td>
                            <td>{patient.date_inscription || '-'}</td>
                            <td>
                              <HistoriqueVisites 
                                patientId={patient.id} 
                                patientNom={`${patient.prenom_utilisateur} ${patient.nom_utilisateur}`} 
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="dashboard-card">
                  <div className="card-header">
                    <h2>Rendez-vous Récents</h2>
                    <button className="view-all-btn">Voir tout</button>
                  </div>
                  <div className="appointments-list">
                    {recentAppointments.map(apt => (
                      <div key={apt.id} className="appointment-item">
                        <div className="appointment-time">
                          <span className="time">{apt.heure}</span>
                          <span className="date">{new Date(apt.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</span>
                        </div>
                        <div className="appointment-details">
                          <h4>{apt.patient}</h4>
                          <p>{apt.medecin} • {apt.type}</p>
                        </div>
                        <span className={`status-badge ${apt.statut === 'Confirmé' ? 'status-active' : 'status-pending'}`}>
                          {apt.statut}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'patients' && (
            <div className="page-content">
              <div className="page-header">
                <div>
                  <h2>Gestion des Patients</h2>
                  <p>{patients.length} patients enregistrés</p>
                </div>
                {user?.roles?.includes('secretaire') && (
                  <button className="add-btn" onClick={() => setShowAddPatient(true)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                    Ajouter un patient
                  </button>
                )}
              </div>

              <div className="patients-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nom complet</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                      <th>Date de naissance</th>
                      <th>Couverture</th>
                      <th>Inscription</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map(patient => (
                      <tr key={patient.id}>
                        <td>
                          <strong>{patient.prenom_utilisateur} {patient.nom_utilisateur}</strong>
                        </td>
                        <td>{patient.email}</td>
                        <td>{patient.numero_tlp || '-'}</td>
                        <td>{new Date(patient.dateNaissance).toLocaleDateString('fr-FR')}</td>
                        <td>
                          <span className="coverage-badge">{patient.couverture_medicale}</span>
                        </td>
                        <td>{patient.date_inscription || '-'}</td>
                        <td>
                          <div className="table-actions">
                            <button className="action-btn-icon view" title="Voir historique">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'employees' && (
            <div className="page-content">
              <div className="page-header">
                <div>
                  <h2>Gestion des Employés</h2>
                  <p>{employees.length} employés enregistrés</p>
                </div>
                <button className="add-btn" onClick={() => setShowAddEmployee(true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                  Ajouter un employé
                </button>
              </div>

              <div className="employees-grid">
                {employees.map(emp => (
                  <div key={emp.id} className="employee-card">
                    <div className="employee-avatar">
                      {emp.prenom_utilisateur?.charAt(0) || 'P'}{emp.nom_utilisateur?.charAt(0) || 'N'}
                    </div>
                    <div className="employee-info">
                      <h3>{emp.prenom_utilisateur} {emp.nom_utilisateur}</h3>
                      <p className="employee-role">
                        {emp.role === 'medecin' ? (
                          <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                              <path d="M9 12l2 2 4-4"/>
                            </svg>
                            Médecin - {emp.specialite}
                          </>
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                              <circle cx="12" cy="7" r="4"/>
                            </svg>
                            Secrétaire
                          </>
                        )}
                      </p>
                      <div className="employee-contact">
                        <span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                          </svg>
                          {emp.email}
                        </span>
                        <span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                          </svg>
                          {emp.numero_tlp}
                        </span>
                      </div>
                    </div>
                    <div className="employee-actions">
                      <button className="action-btn edit" onClick={() => handleEditEmployee(emp)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button className="action-btn delete" onClick={() => handleDeleteEmployee(emp.id)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="page-content">
              <h2>Gestion des Rendez-vous</h2>
              <p>Contenu de la page rendez-vous à venir...</p>
            </div>
          )}

          {activeTab === 'conges' && (
            <div className="page-content">
              <CongeManager
                demandes={demandesConge}
                currentUser={user}
                onApprove={(id) => {
                  setDemandesConge(demandesConge.map(d => 
                    d.id_conge === id ? { ...d, statut: 'accepte' } : d
                  ));
                  alert('Demande de congé acceptée !');
                }}
                onReject={(id) => {
                  setDemandesConge(demandesConge.map(d => 
                    d.id_conge === id ? { ...d, statut: 'refuse' } : d
                  ));
                  alert('Demande de congé refusée !');
                }}
              />
            </div>
          )}

          {activeTab === 'calendrier' && (
            <div className="page-content">
              <CalendrierConges />
            </div>
          )}

          {activeTab === 'actes' && (
            <div className="page-content">
              <ActesMedicauxManager
                actes={actesMedicaux}
                onAdd={(data) => {
                  const newActe = {
                    id_acte: actesMedicaux.length + 1,
                    ...data,
                    tarif: parseFloat(data.tarif)
                  };
                  setActesMedicaux([...actesMedicaux, newActe]);
                  alert(`Acte "${data.nom_acte}" ajouté avec succès !`);
                }}
                onUpdate={(updatedActe) => {
                  setActesMedicaux(actesMedicaux.map(a => 
                    a.id_acte === updatedActe.id_acte ? updatedActe : a
                  ));
                  alert('Acte modifié avec succès !');
                }}
                onDelete={(id) => {
                  if (window.confirm('Voulez-vous vraiment supprimer cet acte ?')) {
                    setActesMedicaux(actesMedicaux.filter(a => a.id_acte !== id));
                    alert('Acte supprimé !');
                  }
                }}
              />
            </div>
          )}

          {activeTab === 'factures' && (
            <div className="page-content">
              <FacturesManager />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="page-content">
              <h2>Paramètres</h2>
              <p>Contenu de la page paramètres à venir...</p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <AddPatientModal
        isOpen={showAddPatient}
        onClose={() => setShowAddPatient(false)}
        onAdd={(data) => {
          const newPatient = {
            id: patients.length + 1,
            ...data,
            date_inscription: new Date().toISOString().split('T')[0]
          };
          setPatients([...patients, newPatient]);
          alert(`Patient ${data.prenom_utilisateur} ${data.nom_utilisateur} ajouté avec succès !`);
        }}
      />

      <AddEmployeeModal 
        isOpen={showAddEmployee} 
        onClose={() => { 
          setShowAddEmployee(false); 
          setEditingEmployee(null); 
        }}
        initialData={editingEmployee}
        onAdd={(data) => {
          if (editingEmployee) {
            setEmployees(employees.map(e => 
              e.id === editingEmployee.id ? { ...e, ...data } : e
            ));
            alert('Employé modifié avec succès !');
          } else {
            setEmployees([...employees, { id: Date.now(), ...data }]);
            alert('Employé ajouté avec succès !');
          }
          setShowAddEmployee(false);
          setEditingEmployee(null);
        }} 
      />
    </div>
  );
};

export default AdminDashboard;