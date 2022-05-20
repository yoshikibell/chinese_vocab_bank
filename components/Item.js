import { useState, useEffect } from "react";

const Item = ({ data, savedChars, setSavedChars }) => {
  const charId = data[0];
  const [highlightStatus, setHighlightStatus] = useState(false);
  const saveCharHandler = () => {
    setHighlightStatus((highlightStatus = !highlightStatus));
    if (!savedChars.includes(charId)) {
      setSavedChars([...savedChars, charId]);
    } else {
      setSavedChars(savedChars.filter((el) => el !== charId));
    }
  };

  useEffect(() => {
    if (savedChars.includes(charId)) {
      setHighlightStatus(true);
    }
    return () => {};
  }, [charId, savedChars]);

  return (
    <tr onDoubleClick={() => saveCharHandler()} className={`${highlightStatus ? "is-highlighted" : ""}`}>
      {data.map((attr, index) => {
        return (
          <td key={index} className={`col_${index}`}>
            {attr}
          </td>
        );
      })}
    </tr>
  );
};

export default Item;
