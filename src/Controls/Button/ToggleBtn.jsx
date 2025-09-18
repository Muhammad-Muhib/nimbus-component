import React from 'react';
import { InfoIcon } from 'nimbus-kit';

const ToggleBtn = ({ label, isOn, onToggle, readOnly = false, infoText = null }) => {
  return (
    <div className="toggle-switch-container">
      <span className="toggle-switch-label">{label}</span>
      <div 
        className={`toggle-switch ${isOn ? 'on' : 'off'} ${readOnly ? 'readonly' : ''}`} 
        onClick={readOnly ? undefined : onToggle}
        style={{ cursor: readOnly ? 'default' : 'pointer' }}
      >
        {!readOnly && <div className="toggle-switch-inner-circle"></div>}
        <span className="toggle-switch-text">{isOn ? 'ON' : 'OFF'}</span>
      </div>
      {infoText && (
        <div>
          <InfoIcon body={infoText}>
          </InfoIcon>
        </div>
      )}
    </div>
  );
};

export default ToggleBtn;
