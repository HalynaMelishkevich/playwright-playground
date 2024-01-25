import { expect } from '@playwright/test'
import { Component } from '../../../abstractClasses'
import { step } from '../../../../utils/stepDecorator'

export class Footer extends Component {
  private readonly notes = {
    hint: this.page.locator('.info p').nth(0),
    createdBy: this.page.locator('.info p').nth(1),
    mainApp: this.page.locator('.info p').nth(2)
  }

  @step()
  async expectLoaded (message = 'Expected Footer to load'): Promise<void> {
    await expect(this.notes.hint).toBeVisible()
    await expect(this.notes.createdBy).toBeVisible()
    await expect(this.notes.mainApp).toBeVisible()
  }
}
