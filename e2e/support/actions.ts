import { expect, type Page } from '@playwright/test'

import {
  getAddElementButton,
  getBeamCanvas,
  getRandomizeButton,
  getShearHeading,
} from './locators'

export const openCalculator = async (page: Page) => {
  await page.goto('/')

  await expect(getBeamCanvas(page)).toBeVisible()
  await expect(getRandomizeButton(page)).toBeVisible()
}

export const openSolvedBeam = async (page: Page) => {
  await openCalculator(page)
  await getRandomizeButton(page).click()
  await expect(getShearHeading(page)).toBeInViewport()
}

export const addCurrentTabUnit = async (page: Page) => {
  await getAddElementButton(page).click()
}
