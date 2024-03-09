import ok from '../../images/passed-icon.svg';
import fail from '../../images/failed-icon.svg';
const InfoTooltip = props => {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container ${!props.errorServer ? 'popup__ok' : 'popup__error'}`}>
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <img className="popup__main" alt="логотип" src={!props.errorServer ? ok : fail} />
        <h2 className="popup__message">{props.tooltip.message || props.errorServer}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;