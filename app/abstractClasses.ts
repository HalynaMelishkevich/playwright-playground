import type { Page } from '@playwright/test'
import { step } from '../utils/stepDecorator'

export abstract class PageHolder {
  constructor (protected page: Page) {
  }
}

export abstract class Component extends PageHolder {
  abstract expectLoaded (argsObject?: any): Promise<void>

  @step()
  async isLoaded (): Promise<boolean> {
    try {
      await this.expectLoaded()
      return true
    } catch {
      return false
    }
  }
}

export abstract class AppPage extends Component {
  public abstract pagePath: string

  @step()
  async open (path?: string): Promise<void> {
    await this.page.goto(path ?? this.pagePath)
    await this.expectLoaded()
  }
}
