import { test } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { Application } from '../app'

let todoItem: string
test.beforeEach(async ({ page }) => {
  todoItem = faker.lorem.sentence(3)
})

test.describe('Add Todo', () => {
  test('Should allow the user to add ToDo item', async ({ page }) => {
    const app = new Application(page)

    await app.todos.open()
    await app.todos.expectLoaded()
    await app.todos.warning.expectLoaded()
    await app.todos.footer.expectLoaded()

    await app.todos.addTodo(todoItem)
    await app.todos.todoFooter.expectLoaded()
    await app.todos.todoItem.expectLoaded(todoItem)
  })
})
