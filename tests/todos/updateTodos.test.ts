import { test } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { Application } from '../../app'

let todoItem: string
test.beforeEach(async ({ page }) => {
  todoItem = faker.lorem.sentence(3)
})

test.describe('Update Todo', () => {
  test('Should allow the user to edit ToDo item title', async ({ page }) => {
    const app = new Application(page)
    const updatedTodoItem = faker.lorem.sentence(3)

    await app.todos.open()
    await app.todos.expectLoaded()

    await app.todos.addTodo(todoItem)
    await app.todos.todoItem.clickTitle({})

    await app.todos.todoItem.expectEditable({})

    await app.todos.todoItem.updateTodo(updatedTodoItem)
    await app.todos.todoItemFooter.expectLoaded()
    await app.todos.todoItem.expectLoaded({ itemText: updatedTodoItem })
  })

  test('Should allow the user to complete ToDo item', async ({ page }) => {
    const app = new Application(page)

    await app.todos.open()
    await app.todos.expectLoaded()

    await app.todos.addTodo(todoItem)
    await app.todos.todoItem.clickTodoCompletionToggle({})

    await app.todos.todoItem.expectItemStrikethroughState({ strikethrough: true })
    await app.todos.todoItemFooter.expectLoaded('0')
  })

  test('Should allow the user to un-complete ToDo item', async ({ page }) => {
    const app = new Application(page)

    await app.todos.open()
    await app.todos.expectLoaded()
    await app.todos.addTodo(todoItem)
    await app.todos.todoItem.clickTodoCompletionToggle({})
    await app.todos.todoItem.clickTodoCompletionToggle({})

    await app.todos.todoItem.expectItemStrikethroughState({ strikethrough: false })
    await app.todos.todoItemFooter.expectLoaded('1')
  })
})
