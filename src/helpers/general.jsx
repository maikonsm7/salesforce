const cleanString = txt => txt.replace(/[^a-zA-Z0-9]/g, '')

const dateHour = timeStamp => new Date(timeStamp).toLocaleString().replace(',', ' -')
const dateFormat = timeStamp => new Date(timeStamp).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
const dateForInput = timeStamp => new Date(timeStamp).toISOString().split('T')[0]
const releaseDate = timeStamp => {
  const date = new Date(timeStamp)
  date.setDate(date.getDate() + 90)
  return date.toLocaleDateString('pt-BR')
}
const convertToReal = value => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

const firstLastName = txt => {
  const nameArray = txt.split(' ')
  const firstName = nameArray[0]
  const lastName = nameArray.length > 1 ? nameArray.pop() : '';
  return `${firstName} ${lastName}`
}

const applyMask = (value, pattern) => {
  if (!value) {
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

export {
  cleanString,
  dateHour,
  convertToReal,
  firstLastName,
  applyMask,
  dateFormat,
  dateForInput,
  releaseDate
}