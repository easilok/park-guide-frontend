import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Play } from 'react-feather';

import '../styles/start-modal.scss';

interface StartModalProps {
  startHref: string;
}

const StartModal: React.FC<StartModalProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const modalClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === 'welcome-modal') {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <button
        className="welcome-button btn-green"
        onClick={() => setIsOpen(true)}
      >
        {t('Visit')}
      </button>
      {isOpen && (
        <div
          className="welcome-modal"
          id="welcome-modal"
          onClick={modalClickHandler}
        >
          <div className="welcome-modal__content">
            <div className="header">
              <h3>Guia de visita ao Parque</h3>
            </div>
            <hr />
            <div className="main">
              <p>
                Esta aplicação irá acompanhá-lo na sua visita ao parque,
                fornecendo dados adicionais sobre a zona onde se encontra no
                momento, bem como qualquer elemento de fauna ou flora que se
                possa deparar.
                <br />
                Ao longo do percurso irá encontrar placas com códigos para ler
                com a sua câmara ou inserindo o número associado, que lhe
                mostrará o conteúdo relacionado com a zona em que se encontra.
                <br />
                No canto superior direito terá um atalho que lhe mostrará a sua
                localização no mapa, com base na última zona visitada, ou pelas
                coordenadas GPS caso existam.
                <br />
                Aproveite a visita e viva o ambiente proporcionado pelo Parque
                Biológico de Gaia
              </p>
            </div>
            <div className="footer">
              <a className="" href={props.startHref}>
                <Play />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartModal;
