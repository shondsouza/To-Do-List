        // Get DOM elements
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        const emptyMessage = document.getElementById('emptyMessage');

        // Load tasks from localStorage
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Function to save tasks to localStorage
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            updateEmptyMessage();
        }

        // Function to add a new task
        function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText === '') return;

            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };

            tasks.push(task);
            renderTask(task);
            saveTasks();
            taskInput.value = '';
        }

        // Function to render a single task
        function renderTask(task) {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;

            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                <span>${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            `;

            taskList.appendChild(li);
        }

        // Function to toggle task completion
        function toggleTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                const li = document.querySelector(`li[data-id="${id}"]`);
                li.classList.toggle('completed');
                saveTasks();
            }
        }

        // Function to delete a task
        function deleteTask(id) {
            tasks = tasks.filter(t => t.id !== id);
            const li = document.querySelector(`li[data-id="${id}"]`);
            li.remove();
            saveTasks();
        }

        // Function to update empty message visibility
        function updateEmptyMessage() {
            emptyMessage.style.display = tasks.length === 0 ? 'block' : 'none';
        }

        // Add event listener for Enter key
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        // Initial render of tasks
        tasks.forEach(renderTask);
        updateEmptyMessage();