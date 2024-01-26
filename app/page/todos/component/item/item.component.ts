import { expect, type Locator } from '@playwright/test'
import { Component } from '../../../../abstractClasses'
import { step } from '../../../../../utils/stepDecorator'

export class TodoItem extends Component {
  private readonly checkMark = (level: number = 0): Locator => this.page.locator('.todo-list .toggle').nth(level)
  private readonly title = (level: number = 0): Locator => this.page.locator('.todo-list label').nth(level)
  private readonly deleteButton = (level: number = 0): Locator => this.page.locator('.todo-list .destroy').nth(level)
  private readonly editableItemInput = this.page.locator('.todo-list .edit')

  @step()
  async clickTitle ({ level }: { level?: number }): Promise<void> {
    await this.title(level).dblclick()
  }

  @step()
  async updateTodo (text: string): Promise<void> {
    await this.editableItemInput.fill(text)
    await this.editableItemInput.press('Enter')
  }

  @step()
  async expectEditable ({ level }: { level?: number }): Promise<void> {
    await expect(this.checkMark(level)).toBeVisible({ visible: false })
    await expect(this.deleteButton(level)).toBeVisible({ visible: false })
    await expect(this.title(level)).toBeEditable()
  }

  @step()
  async expectLoaded ({ level, itemText }: { level?: number, itemText: string }): Promise<void> {
    await expect(this.checkMark(level)).toBeVisible()
    await expect(this.title(level)).toHaveText(itemText)
  }
}
