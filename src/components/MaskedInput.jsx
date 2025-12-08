import { useState } from 'react';
import { applyMask } from '../helpers/maskInput';

const MaskedInput = ({ ...props }) => {
  const [inputValue, setInputValue] = useState(applyMask(props.value || '', props.mask));

  const handleChange = e => {
    const rawValue = e.target.value;
    const masked = applyMask(rawValue, props.mask);
    setInputValue(masked);
    props.onChange(masked); // repassa o valor formatado para o pai
  };

  return (
    <input
      {...props}
      value={inputValue}
      onChange={handleChange}
      maxLength={props.maxLength}
    />
  );
};

export default MaskedInput;
