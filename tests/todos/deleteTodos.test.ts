import { test } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { Application } from '../../app'

let todoItem: string
test.beforeEach(async ({ page }) => {
  todoItem = faker.lorem.sentence(3)
})

test.describe('Delete Todo', () => {
  test('Should allow the user to edit ToDo item', async ({ page }) => {
    const app = new Application(page)

    await app.todos.open()
    await app.todos.expectLoaded()

    await app.todos.addTodo(todoItem)
    await app.todos.todoItem.deleteTodo({})

    await app.todos.todoItem.expectNotLoaded({})
  })
})
