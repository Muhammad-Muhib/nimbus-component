export default function CustomRadioButton({
  value,
  name,
  htmlFor,
  label,
  checked,
  onChange,
}) {
  return (
    <div className="youtubeLanguage-custom-radio">
      <input
        type="radio"
        id={htmlFor}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  );
}
