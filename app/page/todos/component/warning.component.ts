import { expect } from '@playwright/test'
import { Component } from '../../../abstractClasses'
import { step } from '../../../../utils/stepDecorator'

export class Warning extends Component {
  private readonly mainApp = this.page.locator('[href*="https://todomvc.com/"]')

  @step()
  async expectLoaded (message = 'Expected Footer to load'): Promise<void> {
    await expect(this.mainApp).toBeVisible()
  }
}
