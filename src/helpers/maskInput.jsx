export function applyMask(value, pattern) {
  const cleanValue = value.replace(/\D/g, '');
  let maskedValue = '';
  let valueIndex = 0;

  for (let i = 0; i < pattern.length && valueIndex < cleanValue.length; i++) {
    if (pattern[i] === '#') {
      maskedValue += cleanValue[valueIndex];
      valueIndex++;
    } else {
      maskedValue += pattern[i];
    }
  }

  return maskedValue;
}
