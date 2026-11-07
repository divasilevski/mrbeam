import { expect, test } from '@playwright/test'

import { addCurrentTabUnit, openCalculator } from './support/actions'
import {
  getCalculateButton,
  getErrorIndicator,
  getRandomizeButton,
  getShearHeading,
} from './support/locators'

test('hints for unsolvable beams', async ({ page }) => {
  await openCalculator(page)

  await addCurrentTabUnit(page)
  await expect(getErrorIndicator(page)).toBeVisible()
  await expect(getCalculateButton(page)).toBeDisabled()

  await getRandomizeButton(page).click()

  await expect(getErrorIndicator(page)).toHaveCount(0)
  await expect(getCalculateButton(page)).toBeEnabled()
  await expect(getShearHeading(page)).toBeInViewport()
})
