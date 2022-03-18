import {useState} from 'react';

export const Tabs = ({labels, activeTab, setActiveTab}) => {
  return (
      <div className="output__tabs output-tabs">
        {labels.map(label => (
            <button className={`output-tabs__item ${ activeTab === label ? "active" : ""}`} type="button"
                key={label}
                onClick={() => {
                  setActiveTab(label);
                }}>
              {label}
            </button>
        ))}
      </div>
  )
}