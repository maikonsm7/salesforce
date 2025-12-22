const cleanString = txt => txt.replace(/[^a-zA-Z0-9]/g, '')

const dateHour = timeStamp => new Date(timeStamp).toLocaleString().replace(',', ' -')

const firstLastName = txt => {
    const nameArray = txt.split(' ')
    const firstName = nameArray[0]
    const lastName = nameArray.length > 1 ? nameArray.pop() : '';
    return `${firstName} ${lastName}`
}

const applyMask = (value, pattern) => {
  if(!value){
    return ''
  }
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

export { cleanString, dateHour, firstLastName, applyMask }