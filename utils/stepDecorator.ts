import { test } from '@playwright/test';

/**
 * Decorator for a test step to use proper test title in reporting
 * @param? message
 */
export function step<This, Args extends any[], Return>(message?: string) {
    return function stepDecorator(target: (this: This, ...args: Args) => Promise<Return>, context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>) {
        function replacementMethod(this: any, ...args: Args) {
            const name = message ?? `${this.constructor.name}.${context.name as string}`;

            return test.step(name, async () => target.call(this, ...args), { box: true });
        }

        return replacementMethod;
    }
}
