import React from 'react';
import InfoIcon from '../Tooltip/InfoIcon';

const ToggleBtn = ({ label, isOn, onToggle, readOnly = false, infoText = null, customClassContainer="", customClassLabel="" }) => {
  return (
    <div className={`${customClassContainer != "" ? customClassContainer : "toggle-switch-container"}`}>
      <span className={`${customClassLabel != "" ? customClassLabel : "toggle-switch-label "}`}>{label}</span>
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
