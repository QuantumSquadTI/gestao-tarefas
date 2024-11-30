const toggleButton = document.getElementById('toggle-view');
const board = document.querySelector('.board');


toggleButton.addEventListener('click', () => {

  if (board.classList.contains('kanban-view')) {
    board.classList.remove('kanban-view');
    board.classList.add('list-view');
    toggleButton.textContent = 'Alternar para Kanban'; 
  } else {
    board.classList.remove('list-view');
    board.classList.add('kanban-view');
    toggleButton.textContent = 'Alternar para Lista'; 
  }
});