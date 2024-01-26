import { expect } from '@playwright/test'
import { Footer, Warning, TodoItem, TodoItemFooter } from './component'
import { AppPage } from '../../abstractClasses'
import { step } from '../../../utils/stepDecorator'

export class Todos extends AppPage {
  public pagePath = '/todomvc'

  public readonly footer = new Footer(this.page)
  public readonly warning = new Warning(this.page)
  public readonly todoItemFooter = new TodoItemFooter(this.page)
  public readonly todoItem = new TodoItem(this.page)

  private readonly heading = this.page.getByRole('heading')
  private readonly input = this.page.locator('.new-todo')
  private readonly todosList = this.page.getByRole('list')

  @step()
  async addTodo (text: string): Promise<void> {
    await this.input.fill(text)
    await this.input.press('Enter')
  }

  @step()
  async expectLoaded (): Promise<void> {
    await expect(this.heading, 'todos').toBeVisible()
    await expect(this.input, 'What needs to be done?').toBeVisible()
  }
}
