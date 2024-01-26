import { test } from '@playwright/test'

/**
 * Decorator for a test step to use proper test title in reporting
 * @param? message
 */
export function step<This, Args extends any[], Return> (message?: string) {
  return function stepDecorator (target: (this: This, ...args: Args) => Promise<Return>, context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>) {
    async function replacementMethod (this: any, ...args: Args): Promise<Return> {
      const name = message ?? `${this.constructor.name}.${context.name as string}`

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return await test.step(name, async () => await target.call(this, ...args), { box: true })
    }

    return replacementMethod
  }
}
