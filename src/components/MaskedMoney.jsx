import { NumericFormat } from "react-number-format";

const MaskedMoney = ({ value, onChange, className, id, name }) => {
  return (
    <NumericFormat
      className={className}
      id={id}
      name={name}
      value={value}
      onValueChange={(values) => {
        onChange(values.floatValue)
      }}
      thousandSeparator="."
      decimalSeparator=","
      // prefix="R$ "
      decimalScale={2}
      fixedDecimalScale={true}
      allowNegative={false}
    // placeholder="R$ 0,00"
    />
  )
}

export default MaskedMoney;