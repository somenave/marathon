export const Forecast = ({label, activeTab}) => {
  return (
      <div className={`output__forecast forecast output-item ${label === activeTab ? "active" : ''}`}>
        <div className="forecast__location location">Aktobe</div>
        <div className="forecast__cards">
        </div>
      </div>
  )
}