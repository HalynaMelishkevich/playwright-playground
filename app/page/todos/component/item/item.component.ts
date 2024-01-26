import { expect } from '@playwright/test'
import { Component } from '../../../../abstractClasses'
import { step } from '../../../../../utils/stepDecorator'

export class TodoItem extends Component {
  private readonly checkMark = this.page.locator('.toggle')
  private readonly title = this.page.locator('.todo-list label')
  private readonly deleteButton = this.page.locator('.destroy')
  private readonly editableItemInput = this.page.locator('.todo-list .edit')

  @step()
  async clickTitle (): Promise<void> {
    await this.title.dblclick()
  }

  @step()
  async updateTodo (text: string): Promise<void> {
    await this.editableItemInput.fill(text)
    await this.editableItemInput.press('Enter')
  }

  @step()
  async expectLoaded (itemText: string): Promise<void> {
    await expect(this.checkMark).toBeVisible()
    await expect(this.title).toHaveText(itemText)
  }

  @step()
  async expectEditable (): Promise<void> {
    await expect(this.checkMark).toBeVisible({ visible: false })
    await expect(this.deleteButton).toBeVisible({ visible: false })
    await expect(this.title).toBeEditable()
  }
}
