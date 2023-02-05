import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import enFlagIcon from '../../../assets/images/lang/en.png';
import ruFlagIcon from '../../../assets/images/lang/ru.png';
import ukFlagIcon from '../../../assets/images/lang/uk.png';
import css from './LanguageSwitcher.module.css';

const languages: any = {
  en: { icon: enFlagIcon, nativeName: 'English' },
  uk: { icon: ukFlagIcon, nativeName: 'Українська' },
  ru: { icon: ruFlagIcon, nativeName: 'Русский' },
};

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className={css.container}>
      {Object.keys(languages).map((lng: any) => (
        <div className={css.btnWrp} key={lng}>
          <button
            className={clsx(css.lngBtn, {
              [css.noActive]: i18n.resolvedLanguage !== lng,
            })}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            <img src={languages[lng].icon} alt={languages[lng].nativeName} width="50" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
