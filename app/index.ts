import { PageHolder } from './abstractClasses'
import { Todos } from './page/todos/todos.page'

export class Application extends PageHolder {
  public todos = new Todos(this.page)
}
