export enum ErrorMessage {
  UnitsIsArray = 'TypeError | hint: data should be an array',
  UnitsAreOjects = 'TypeError | hint: units should be objects',
  UnitsHasX = 'TypeError | hint: units should have <x> property',
  UnitsHasType = 'TypeError | hint: units should have <type> property',
  UnitsXType = 'TypeError | hint: property <x> should be a number or an array',
  UnitsTypeValue = 'TypeError | hint: property <type> should have a specific value',
  UnitsHasValue = 'TypeError | hint: some units should have <value> property',
  UnitsValueType = 'TypeError | hint: property <value> should be a number or an array',
  NotEnough = 'FormatError | hint: not enough units',
  MoreSupports = 'FormatError | hint: units should have more supports',
}
