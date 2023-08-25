//classe que irá conter a lógica dos dados
//como os dados serão estruturados
export class Favorites
{
  constructor(root)
  {
    this.root = document.querySelector(root)
    this.load()
  }

  load()
  {
    this.entries = [
      {
      login:'PedroHPCarvalho',
      name:'Pedro Carvalho',
      public_repos: '89',
      followers: '46'
      }
    ]
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

  }

  update()
  {
    this.removeAllTr()

    

    this.entries.forEach( user => {
      const row = this.createRow()
      console.log(row)

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      this.tbody.append(row)
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
    .forEach(() => {
      tr.remove()
    })
  }
}

