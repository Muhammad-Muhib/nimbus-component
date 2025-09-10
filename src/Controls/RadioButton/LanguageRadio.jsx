export default function LanguageRadio({selected,setSelected}) {

  return (
    <div className="youtubeLanguage-radio-container">
      <div className="youtubeLanguage-custom-radio">
        <input
          type="radio"
          id="urdu"
          name="language"
          value="1"
          checked={selected == "1"}
          onChange={(e) => setSelected(e.target.value)}
        />
        <label htmlFor="urdu">Urdu</label>
      </div>

      <div className="youtubeLanguage-custom-radio">
        <input
          type="radio"
          id="english"
          name="language"
          value="2"
          checked={selected == "2"}
          onChange={(e) => setSelected(e.target.value)}
        />
        <label htmlFor="english">English</label>
      </div>
    </div>
  );
}
