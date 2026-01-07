import React, { useState } from 'react';

const MesConges = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="secretaire-card">
      <div className="secretaire-header-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#1D837F', margin: 0 }}>Gestion de mes congés</h2>
        <button 
          className={showForm ? "secretaire-btn-secondary" : "secretaire-btn-primary"} 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Annuler' : '+ Nouvelle demande'}
        </button>
      </div>

      {/* FORMULAIRE DE DEMANDE */}
      {showForm && (
        <div style={{ background: '#F8FAFC', padding: '25px', borderRadius: '15px', marginBottom: '30px', border: '1px solid #E2E8F0' }}>
          <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'end' }}>
            <div className="form-group">
              <label className="secretaire-date-text">Type de congé</label>
              <select className="secretaire-input" required>
                <option value="Annuel">Annuel</option>
                <option value="Maladie">Maladie</option>
                <option value="Exceptionnel">Exceptionnel</option>
              </select>
            </div>
            <div className="form-group">
              <label className="secretaire-date-text">Date de début</label>
              <input type="date" className="secretaire-input" required />
            </div>
            <div className="form-group">
              <label className="secretaire-date-text">Date de fin</label>
              <input type="date" className="secretaire-input" required />
            </div>
            <div style={{ gridColumn: 'span 3', textAlign: 'right', marginTop: '10px' }}>
              <button type="submit" className="secretaire-btn-primary" style={{ width: '200px' }}>
                Envoyer la demande
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LISTE DES DEMANDES */}
      <div className="secretaire-table-container">
        <table className="secretaire-table">
          <thead>
            <tr>
              <th>TYPE</th>
              <th>DÉBUT</th>
              <th>FIN</th>
              <th style={{ textAlign: 'center' }}>STATUT / DÉCISION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Annuel</strong></td>
              <td>15/07/2024</td>
              <td>30/07/2024</td>
              <td style={{ textAlign: 'center' }}>
                <span className="secretaire-status green">Accordé</span>
              </td>
            </tr>
            <tr>
              <td><strong>Exceptionnel</strong></td>
              <td>10/05/2024</td>
              <td>12/05/2024</td>
              <td style={{ textAlign: 'center' }}>
                <span className="secretaire-status blue">En attente</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MesConges;