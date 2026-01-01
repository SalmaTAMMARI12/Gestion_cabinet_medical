import React from 'react';
import './CalendrierConges.css';

const CalendrierConges = () => {
  return (
    <div style={{ padding: '40px', background: 'white', borderRadius: '16px' }}>
      <h2 style={{ fontSize: '28px', color: '#1F2937', marginBottom: '20px' }}>
        Calendrier des Congés
      </h2>
      
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Statut des Médecins</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {/* Dr. Benali */}
          <div style={{ 
            padding: '20px', 
            background: '#F9FAFB', 
            borderRadius: '12px',
            border: '1px solid #E5E7EB'
          }}>
            <strong style={{ fontSize: '18px', color: '#1F2937' }}>Dr. Benali</strong>
            <p style={{ margin: '5px 0', color: '#6B7280' }}>Cardiologue</p>
            <span style={{ 
              display: 'inline-block',
              padding: '6px 12px',
              background: '#FEE2E2',
              color: '#B91C1C',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              marginTop: '10px'
            }}>
              En congé : 15 - 20 Janvier
            </span>
          </div>

          {/* Dr. Chakir */}
          <div style={{ 
            padding: '20px', 
            background: '#F9FAFB', 
            borderRadius: '12px',
            border: '1px solid #E5E7EB'
          }}>
            <strong style={{ fontSize: '18px', color: '#1F2937' }}>Dr. Chakir</strong>
            <p style={{ margin: '5px 0', color: '#6B7280' }}>Dermatologue</p>
            <span style={{ 
              display: 'inline-block',
              padding: '6px 12px',
              background: '#D1FAE5',
              color: '#065F46',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              marginTop: '10px'
            }}>
              Disponible
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendrierConges;