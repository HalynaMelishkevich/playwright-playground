import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { Application } from '../app'

let todoItem: string
test.beforeEach(async ({ page }) => {
  todoItem = faker.lorem.sentence(3)
})

test.describe('Add Todo', () => {
  test('Should allow the user to add small ToDo item', async ({ page }) => {
    const app = new Application(page)

    await app.todos.open()
    await app.todos.expectLoaded()
    await app.todos.warning.expectLoaded()
    await app.todos.footer.expectLoaded()

    await app.todos.addTodo(todoItem)
    await app.todos.todoItemFooter.expectLoaded()
    await app.todos.todoItem.expectLoaded(todoItem)
  })

  test('Should allow the user to add large ToDo item', async ({ page }) => {
    const app = new Application(page)
    todoItem = faker.lorem.sentence(100000)

    await app.todos.open()
    await app.todos.expectLoaded()

    await app.todos.addTodo(todoItem)
    await app.todos.todoItem.expectLoaded(todoItem)
  })

  test('Should allow the user to add ToDo item with a script without its execution', async ({ page }) => {
    const app = new Application(page)
    let isDialogOpened = false
    page.on('dialog', (dialog) => {
      isDialogOpened = true
      void dialog.accept()
    })
    todoItem = '<script> alert(`Test`) </script>'

    await app.todos.open()
    await app.todos.expectLoaded()

    await app.todos.addTodo(todoItem)

    expect(isDialogOpened).toBe(false)
  })
})
