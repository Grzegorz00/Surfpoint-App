import React from "react";
import { useTranslation } from 'react-i18next';

function MainContent(){
  const { t } = useTranslation();
    return (
        <main>
            <h2>{t('nav.main-page')}</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque voluptatibus aperiam non nisi optio omnis magnam quibusdam dicta hic ipsum, explicabo tenetur eos quia itaque dolore fugit ex ea voluptas!</p>
        </main>
    )
}

export default MainContent