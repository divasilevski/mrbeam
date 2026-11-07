import { expect, test } from '@playwright/test'

import { openSolvedBeam } from './support/actions'
import {
  getBeamRegion,
  getDocsHeading,
  getShearHeading,
  getUnitItems,
} from './support/locators'

test('keeps the beam across the docs page', async ({ page }) => {
  await openSolvedBeam(page)

  const count = await getUnitItems(page).count()

  await page.getByRole('link', { name: 'Docs' }).click()
  await expect(page).toHaveURL(/\/docs$/)
  await expect(getDocsHeading(page)).toBeVisible()
  await expect(getBeamRegion(page)).toHaveCount(0)

  await page.getByRole('link', { name: 'MrBeam' }).click()
  await expect(page).toHaveURL(/\/$/)

  await expect(getUnitItems(page)).toHaveCount(count)
  await expect(getShearHeading(page)).toBeInViewport()
})
