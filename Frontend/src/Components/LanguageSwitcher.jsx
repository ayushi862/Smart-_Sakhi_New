
import { languages } from "../i18n/translations";
import { useLanguage } from "../Context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-[#dce5d5] bg-white px-3 py-2">
      <span aria-hidden="true">🌐</span>

      <label htmlFor="smart-sakhi-language" className="sr-only">
        {t("language")}
      </label>

      <select
        id="smart-sakhi-language"
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
        className="max-w-32 bg-transparent text-sm font-medium text-[#355E3B] outline-none"
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.native}
          </option>
        ))}
      </select>
    </div>
  );
}
