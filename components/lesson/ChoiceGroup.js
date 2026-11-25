// components/lesson/ChoiceGroup.js
// A row of pill buttons that behave as one radio group: one choice at a time,
// arrow keys move between choices, and screen readers announce the group's
// name. Built on real radio inputs so keyboard and screen reader support come
// from the browser. Used inside the interactive lesson blocks (client side).

import styles from './ChoiceGroup.module.css';

export default function ChoiceGroup({ name, legend, hideLegend = false, options, value, onChange }) {
  return (
    <fieldset className={styles.group}>
      <legend className={hideLegend ? styles.srOnly : styles.legend}>{legend}</legend>
      <div className={styles.choices}>
        {options.map((option) => (
          <label key={option.value} className={styles.choice}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className={styles.input}
            />
            <span className={styles.pill}>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}