import { expect, type Locator } from '@playwright/test'
import { Component } from '../../../../abstractClasses'
import { step } from '../../../../../utils/stepDecorator'

export class TodoItem extends Component {
  private readonly completeToggle = (level: number = 0): Locator => this.page.locator('.todo-list .toggle').nth(level)
  private readonly title = (level: number = 0): Locator => this.page.locator('.todo-list label').nth(level)
  private readonly deleteButton = (level: number = 0): Locator => this.page.locator('.todo-list .destroy').nth(level)
  private readonly editableItemInput = this.page.locator('.todo-list .edit')

  @step()
  async clickTitle ({ level }: { level?: number }): Promise<void> {
    await this.title(level).dblclick()
  }

  @step()
  async clickTodoCompletionToggle ({ level }: { level?: number }): Promise<void> {
    await this.completeToggle(level).click()
  }

  @step()
  async deleteTodo ({ level }: { level?: number }): Promise<void> {
    await this.title(level).hover()
    await this.deleteButton(level).click()
  }

  @step()
  async updateTodo (text: string): Promise<void> {
    await this.editableItemInput.fill(text)
    await this.editableItemInput.press('Enter')
  }

  @step()
  async expectEditable ({ level }: { level?: number }): Promise<void> {
    await expect(this.completeToggle(level)).toBeVisible({ visible: false })
    await expect(this.deleteButton(level)).toBeVisible({ visible: false })
    await expect(this.title(level)).toBeEditable()
  }

  @step()
  async expectLoaded ({ level, itemText }: { level?: number, itemText: string }): Promise<void> {
    await expect(this.completeToggle(level)).toBeVisible()
    await expect(this.title(level)).toHaveText(itemText)
  }

  @step()
  async expectNotLoaded ({ level }: { level?: number }): Promise<void> {
    await expect(this.completeToggle(level)).toHaveCount(0)
    await expect(this.title(level)).toHaveCount(0)
  }

  @step()
  async expectItemStrikethroughState ({ level, strikethrough }: { level?: number, strikethrough: boolean }): Promise<void> {
    if (strikethrough) {
      await expect(this.title(level)).toHaveCSS('text-decoration', /line-through/)
    } else {
      await expect(this.title(level)).not.toHaveCSS('text-decoration', /line-through/)
    }
  }
}
