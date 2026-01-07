import React, { useState } from 'react';

const PrescriptionView = ({ onBack }) => {
  const [activeType, setActiveType] = useState('med');
  const [items, setItems] = useState([]);
  const [commentaireOrdonnance, setCommentaireOrdonnance] = useState('');

  // États pour les champs spécifiques au MLD
  const [formData, setFormData] = useState({
    // Médicaments
    nom_medicament: '', dosage: '', posologie: '', duree_traitement: '', commentaire_med: '',
    // Radio
    zone_corps: '', date_prescription_Rad: new Date().toISOString().split('T')[0], commentaire_rad: '',
    // Analyse
    type_analyse: '', date_prescription_Analyse: new Date().toISOString().split('T')[0], commentaire_analyse: ''
  });

  const handleAdd = () => {
    const newItem = { 
      id: Date.now(), 
      type: activeType, 
      ...formData 
    };
    setItems([...items, newItem]);
    // Reset partiel
    setFormData({
      ...formData,
      nom_medicament: '', dosage: '', posologie: '', duree_traitement: '', commentaire_med: '',
      zone_corps: '', commentaire_rad: '',
      type_analyse: '', commentaire_analyse: ''
    });
  };

  const removeItem = (id) => setItems(items.filter(item => item.id !== id));

  return (
    <div className="ordonnance-container">
      <div className="ordonnance-header">
        <button className="btn-back" onClick={onBack}>← Retour</button>
        <h3>Rédaction de l'Ordonnance</h3>
      </div>

      <div className="presc-type-selector">
        <button className={activeType === 'med' ? 'active' : ''} onClick={() => setActiveType('med')}>Médicaments</button>
        <button className={activeType === 'analyse' ? 'active' : ''} onClick={() => setActiveType('analyse')}>Analyses</button>
        <button className={activeType === 'radio' ? 'active' : ''} onClick={() => setActiveType('radio')}>Radiologie</button>
      </div>

      <div className="ordonnance-form">
        <div className="mld-input-grid">
          {activeType === 'med' && (
            <>
              <input placeholder="Nom médicament" value={formData.nom_medicament} onChange={e => setFormData({...formData, nom_medicament: e.target.value})} />
              <input placeholder="Dosage" value={formData.dosage} onChange={e => setFormData({...formData, dosage: e.target.value})} />
              <input placeholder="Posologie" value={formData.posologie} onChange={e => setFormData({...formData, posologie: e.target.value})} />
              <input placeholder="Durée traitement" value={formData.duree_traitement} onChange={e => setFormData({...formData, duree_traitement: e.target.value})} />
              <input className="full-width-input" placeholder="Commentaire médicament" value={formData.commentaire_med} onChange={e => setFormData({...formData, commentaire_med: e.target.value})} />
            </>
          )}

          {activeType === 'radio' && (
            <>
              <input placeholder="Zone du corps" value={formData.zone_corps} onChange={e => setFormData({...formData, zone_corps: e.target.value})} />
              <input type="date" value={formData.date_prescription_Rad} onChange={e => setFormData({...formData, date_prescription_Rad: e.target.value})} />
              <input className="full-width-input" placeholder="Commentaire radio" value={formData.commentaire_rad} onChange={e => setFormData({...formData, commentaire_rad: e.target.value})} />
            </>
          )}

          {activeType === 'analyse' && (
            <>
              <input placeholder="Type d'analyse" value={formData.type_analyse} onChange={e => setFormData({...formData, type_analyse: e.target.value})} />
              <input type="date" value={formData.date_prescription_Analyse} onChange={e => setFormData({...formData, date_prescription_Analyse: e.target.value})} />
              <input className="full-width-input" placeholder="Commentaire analyse" value={formData.commentaire_analyse} onChange={e => setFormData({...formData, commentaire_analyse: e.target.value})} />
            </>
          )}
        </div>
        <button className="btn-add-med" onClick={handleAdd} style={{marginTop: '10px'}}>Ajouter à l'ordonnance</button>
      </div>

      <div className="ordonnance-preview" style={{marginTop: '20px'}}>
        <table className="mld-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Éléments / Détails</th>
              <th>Commentaires (MLD)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td><span className={`badge-type type-${item.type}`}>{item.type.toUpperCase()}</span></td>
                <td>
                  {item.type === 'med' && `${item.nom_medicament} ${item.dosage} | ${item.posologie} | ${item.duree_traitement}`}
                  {item.type === 'radio' && `${item.zone_corps} (Le ${item.date_prescription_Rad})`}
                  {item.type === 'analyse' && `${item.type_analyse} (Le ${item.date_prescription_Analyse})`}
                </td>
                <td>{item.commentaire_med || item.commentaire_rad || item.commentaire_analyse}</td>
                <td><button onClick={() => removeItem(item.id)}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="global-comment" style={{marginTop: '20px'}}>
          <label>Commentaire général de l'ordonnance :</label>
          <textarea 
            value={commentaireOrdonnance} 
            onChange={(e) => setCommentaireOrdonnance(e.target.value)}
            style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1'}}
          />
        </div>
      </div>
    </div>
  );
};

export default PrescriptionView;