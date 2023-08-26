import { GitHubUser } from "./GitHubUser.js"
//classe que irá conter a lógica dos dados
//como os dados serão estruturados
export class Favorites
{
  constructor(root)
  {
    this.root = document.querySelector(root)
    this.load()

    //GitHubUser.search('PedroHPCarvalho').then(user => console.log(user))
  }

  load()
  {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username){
    try{
      const userExist = this.entries.find(entry => entry.login === username)

      if(userExist)
      {
        throw new Error('Usuário já cadastrado')
      }

      const user = await GitHubUser.search(username)

      if(user.login === undefined)
      {
        throw new Error ('Usuário não encontrado')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    }catch(error)
    {
      alert(error.message)
    }
  }

  delete(user)
  {
    //Higher-order functions (map,filter,find,reduce)
    const filteredEntries = this.entries
      .filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

//classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites
{
  constructor(root)
  {
    super(root)

    this.tbody =  this.root.querySelector('table tbody')
    this.update()
    this.onadd()
  }

  onadd()
  {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')
      this.add(value)
    }
  }

  update()
  {
    this.removeAllTr()

    

    this.entries.forEach( user => {
      const row = this.createRow()
      console.log(row)

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.login}`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      this.tbody.append(row)
      row.querySelector('.remove').onclick = () => {
        const isOK = confirm('Tem certeza que deseja deletar essa linha?')
        if(isOK)
        {
          this.delete(user)
        }
      }
    })
  }

  createRow()
  {
    const tr = document.createElement('tr')

    tr.innerHTML = 
    `
    <td class="user">
          <img src="https://github.com/PedroHPCarvalho.png" alt="Imagem do Usuário">
          <a href="https://github.com/PedroHPCarvalho" target="_blank">
            <p>Pedro Carvalho</p>
            <span>PedroHPCarvalho</span>
        </td>
        <td class="repositories">
         10
        </td>
        <td class="followers">
          2
        </td>
        <td>
          <button class="remove">&times;</button>
        </td>
    `

    return tr
  }

  removeAllTr()
  {
    this.tbody.querySelectorAll('tr')
    .forEach((tr) => {
      tr.remove()
    })
  }
}

