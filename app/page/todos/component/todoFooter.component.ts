import { expect } from '@playwright/test'
import { Component } from '../../../abstractClasses'
import { step } from '../../../../utils/stepDecorator'

export class TodoFooter extends Component {
  private readonly itemsCount = this.page.getByRole('strong')
  private readonly filters = {
    all: this.page.locator('.filters li').nth(0),
    active: this.page.locator('.filters li').nth(1),
    completed: this.page.locator('.filters li').nth(2)
  }

  @step()
  async expectLoaded (message = 'Expected ToDo Footer to load'): Promise<void> {
    await expect(this.itemsCount).toBeVisible()
    await expect(this.filters.all, 'All').toBeVisible()
    await expect(this.filters.active, 'Active').toBeVisible()
    await expect(this.filters.completed, 'Completed').toBeVisible()
  }
}
