import { test } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { Application } from '../../app'

let app: Application
let itemsCount: number
let completedItemsCount: number
let todoItems: string[]
test.beforeEach(async ({ page }) => {
  itemsCount = faker.number.int({ min: 2, max: 10 })
  completedItemsCount = faker.number.int({ min: 1, max: itemsCount - 1 })
  todoItems = []

  app = new Application(page)

  await app.todos.open()
  await app.todos.expectLoaded()
  for (let level = 0; level < itemsCount; level++) {
    todoItems.push(faker.lorem.sentence(3))

    await app.todos.addTodo(todoItems[level])

    if (level <= completedItemsCount) {
      await app.todos.todoItem.clickTodoCompletionToggle({ level })
    }
  }
})

test.describe('Filter Todos', () => {
  test('Should allow the user to filter Todo items by state Completed', async ({ page }) => {
    await app.todos.todoItemFooter.clickFilter({ option: 'completed' })

    for (let level = 0; level < itemsCount; level++) {
      if (level <= completedItemsCount) {
        await app.todos.todoItem.expectLoaded({ level, itemText: todoItems[level] })
      } else {
        await app.todos.todoItem.expectNotLoaded({ level })
      }
    }
  })

  test('Should allow the user to filter Todo items by state Active', async ({ page }) => {
    await app.todos.todoItemFooter.clickFilter({ option: 'active' })

    for (let level = 0; level < itemsCount; level++) {
      if (level <= itemsCount - completedItemsCount) {
        await app.todos.todoItemFooter.expectLoaded(`${itemsCount - completedItemsCount - level}`)
      } else {
        await app.todos.todoItem.expectNotLoaded({ level })
      }
    }
  })

  test('Should allow the user to filter Todo items by state All', async ({ page }) => {
    await app.todos.todoItemFooter.clickFilter({ option: 'active' })
    await app.todos.todoItemFooter.clickFilter({ option: 'completed' })
    await app.todos.todoItemFooter.clickFilter({ option: 'all' })

    for (let level = 0; level < itemsCount; level++) {
      await app.todos.todoItem.expectLoaded({ level, itemText: todoItems[level] })
    }
  })
})
