import { expect, test } from '@playwright/test'

import { openSolvedBeam } from './support/actions'
import {
  getCalculateButton,
  getMomentHeading,
  getShearHeading,
  getUnitItems,
} from './support/locators'

test('restores the beam and calculates it', async ({ page }) => {
  await openSolvedBeam(page)

  const count = await getUnitItems(page).count()

  await page.reload()

  await expect(getUnitItems(page)).toHaveCount(count)
  await expect(getShearHeading(page)).toHaveCount(0)
  await expect(getCalculateButton(page)).toBeEnabled()

  await getCalculateButton(page).click()

  await expect(getShearHeading(page)).toBeInViewport()
  await expect(getMomentHeading(page)).toBeInViewport()
})
