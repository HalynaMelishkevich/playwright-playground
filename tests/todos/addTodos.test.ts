import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { Application } from '../../app'

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
    await app.todos.todoItemFooter.expectLoaded('1')
    await app.todos.todoItem.expectLoaded({ itemText: todoItem })
  })

  test('Should allow the user to add large ToDo item', async ({ page }) => {
    const app = new Application(page)
    todoItem = faker.lorem.sentence(100000)

    await app.todos.open()
    await app.todos.expectLoaded()

    await app.todos.addTodo(todoItem)
    await app.todos.todoItem.expectLoaded({ itemText: todoItem })
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

  test('Should allow the user to add several ToDo items', async ({ page }) => {
    const app = new Application(page)
    const todoItemsCount = faker.number.int({ min: 2, max: 20 })
    const todoItems = Array(todoItemsCount)
      .fill(null).map((u, i) => faker.lorem.sentence(3))

    await app.todos.open()
    await app.todos.expectLoaded()

    for (let todoItemIndex = 1; todoItemIndex <= todoItemsCount; todoItemIndex++) {
      await app.todos.addTodo(todoItems[todoItemIndex - 1])
      await app.todos.todoItemFooter.expectLoaded(`${todoItemIndex}`)
      await app.todos.todoItem.expectLoaded({
        level: todoItemIndex - 1,
        itemText: todoItems[todoItemIndex - 1]
      })
    }
  })
})
