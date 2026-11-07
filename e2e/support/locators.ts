import type { Page } from '@playwright/test'

const SHEAR_TITLE = 'Shear Force Diagram'
const MOMENT_TITLE = 'Bending Moment Diagram'
const ADD_ELEMENT = 'ADD ELEMENT'
const CALCULATE = 'Calculate'
const RANDOMIZE = 'RANDOMIZE'
const REMOVE = 'Remove'
const REMOVE_ALL = 'Remove all'

// Page regions, anchored by the `data-testid` attributes in `pages/index.vue`.
// Every other locator below is scoped to one of them.
export const getBeamRegion = (page: Page) => page.getByTestId('beam')
export const getInputsRegion = (page: Page) => page.getByTestId('inputs')
export const getUnitsRegion = (page: Page) => page.getByTestId('units')
export const getChartsRegion = (page: Page) => page.getByTestId('charts')
export const getDocsRegion = (page: Page) => page.getByTestId('docs')

// Beam locators
export const getBeamCanvas = (page: Page) =>
  getBeamRegion(page).locator('canvas')

export const getRandomizeButton = (page: Page) =>
  getBeamRegion(page).getByRole('button', { name: RANDOMIZE })

// Input locators
export const getTabs = (page: Page) => getInputsRegion(page).getByRole('tab')

export const getVisibleInputs = (page: Page) =>
  getInputsRegion(page).locator('input:visible')

export const getAddElementButton = (page: Page) =>
  getInputsRegion(page).getByRole('button', { name: ADD_ELEMENT })

// Units locators
export const getUnitItems = (page: Page) =>
  getUnitsRegion(page).getByTestId('unit-row')

export const getErrorIndicator = (page: Page) =>
  getUnitsRegion(page).getByTestId('error-indicator')

export const getRemoveUnitButton = (page: Page) =>
  getUnitsRegion(page).getByRole('button', { name: REMOVE, exact: true })

export const getRemoveAllButton = (page: Page) =>
  getUnitsRegion(page).getByRole('button', { name: REMOVE_ALL })

// Charts locators
export const getShearHeading = (page: Page) =>
  getChartsRegion(page).getByRole('heading', { name: SHEAR_TITLE })

export const getMomentHeading = (page: Page) =>
  getChartsRegion(page).getByRole('heading', { name: MOMENT_TITLE })

export const getCalculateButton = (page: Page) =>
  getChartsRegion(page).getByRole('button', { name: CALCULATE })

// The sheet reports its committed position, so tests never read styles.
export const getSheet = (page: Page) =>
  getChartsRegion(page).getByTestId('sheet')

// Docs page, outside the calculator
export const getDocsHeading = (page: Page) =>
  getDocsRegion(page).getByRole('heading', { name: 'MrBeam Calculator' })
