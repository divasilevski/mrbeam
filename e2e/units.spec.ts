import { expect, test } from '@playwright/test'

import {
  addCurrentTabUnit,
  openCalculator,
  openSolvedBeam,
} from './support/actions'
import {
  getCalculateButton,
  getRemoveAllButton,
  getRemoveUnitButton,
  getShearHeading,
  getSheet,
  getTabs,
  getUnitItems,
  getVisibleInputs,
} from './support/locators'

test('adds one element from every tab', async ({ page }) => {
  await openCalculator(page)

  const tabCount = await getTabs(page).count()
  expect(tabCount).toBeGreaterThan(0)

  for (let index = 0; index < tabCount; index++) {
    await getTabs(page).nth(index).click()
    await expect(getVisibleInputs(page).first()).toBeVisible()

    const count = await getUnitItems(page).count()

    await addCurrentTabUnit(page)
    await expect(getUnitItems(page)).toHaveCount(count + 1)
  }
})

test('removes a single element and the whole beam', async ({ page }) => {
  await openCalculator(page)

  await addCurrentTabUnit(page)
  await addCurrentTabUnit(page)
  await expect(getUnitItems(page)).toHaveCount(2)

  await getRemoveUnitButton(page).first().click()
  await expect(getUnitItems(page)).toHaveCount(1)

  await getRemoveAllButton(page).click()
  await expect(getUnitItems(page)).toHaveCount(0)
})

test('drops the solution when the beam changes', async ({ page }) => {
  await openSolvedBeam(page)

  // Collapse the sheet to reach the form.
  await getCalculateButton(page).click()
  await expect(getSheet(page)).toHaveAttribute('data-status', 'min')

  await addCurrentTabUnit(page)

  await expect(getShearHeading(page)).toHaveCount(0)
  await expect(getSheet(page)).toHaveAttribute('data-status', 'min')

  await getCalculateButton(page).click()

  await expect(getShearHeading(page)).toBeInViewport()
  await expect(getSheet(page)).toHaveAttribute('data-status', 'max')
})
