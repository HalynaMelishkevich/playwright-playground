import { expect } from '@playwright/test'
import { Component } from '../../../abstractClasses'
import { step } from '../../../../utils/stepDecorator'

export class TodoItem extends Component {
  private readonly checkMark = this.page.locator('.toggle')
  private readonly title = this.page.locator('.view label')
  private readonly deleteButton = this.page.locator('.destroy')

  @step()
  async expectLoaded (itemText: string): Promise<void> {
    await expect(this.checkMark).toBeVisible()
    await expect(this.title).toHaveText(itemText)
  }
}
