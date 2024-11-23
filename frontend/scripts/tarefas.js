document.addEventListener('DOMContentLoaded', () => {
    const moveTask = (task, direction) => {
      const currentColumn = task.parentNode.parentNode.id;
      let targetColumn;
  
      if (direction === 'right') {
        if (currentColumn === 'pending') targetColumn = 'in-progress';
        else if (currentColumn === 'in-progress') targetColumn = 'completed';
      } else if (direction === 'left') {
        if (currentColumn === 'in-progress') targetColumn = 'pending';
        else if (currentColumn === 'completed') targetColumn = 'in-progress';
      }
  
      if (targetColumn) {
        const targetList = document.getElementById(targetColumn).querySelector('.task-list');
        targetList.appendChild(task);
        updateTaskButtons(task, targetColumn);
      }
    };
  
    const updateTaskButtons = (task, currentColumn) => {
      const actions = task.querySelector('.task-actions');
      actions.innerHTML = '';
  
      if (currentColumn !== 'pending') {
        const leftButton = document.createElement('button');
        leftButton.textContent = '←';
        leftButton.className = 'move-btn';
        leftButton.dataset.direction = 'left';
        leftButton.addEventListener('click', () => moveTask(task, 'left'));
        actions.appendChild(leftButton);
      }
  
      if (currentColumn !== 'completed') {
        const rightButton = document.createElement('button');
        rightButton.textContent = '→';
        rightButton.className = 'move-btn';
        rightButton.dataset.direction = 'right';
        rightButton.addEventListener('click', () => moveTask(task, 'right'));
        actions.appendChild(rightButton);
      }
    };
  
    document.querySelectorAll('.move-btn').forEach((button) => {
      button.addEventListener('click', (e) => {
        const task = e.target.closest('.task');
        const direction = e.target.dataset.direction;
        moveTask(task, direction);
      });
    });
  });
  