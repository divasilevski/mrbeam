import { expect, test } from '@playwright/test'

import { openSolvedBeam } from './support/actions'
import {
  getCalculateButton,
  getShearHeading,
  getSheet,
} from './support/locators'

test('collapses and expands the sheet on toggle', async ({ page }) => {
  await openSolvedBeam(page)

  await expect(getSheet(page)).toHaveAttribute('data-status', 'max')

  await getCalculateButton(page).click()

  await expect(getSheet(page)).toHaveAttribute('data-status', 'min')
  await expect(getShearHeading(page)).not.toBeInViewport()

  await getCalculateButton(page).click()

  await expect(getSheet(page)).toHaveAttribute('data-status', 'max')
  await expect(getShearHeading(page)).toBeInViewport()
})
