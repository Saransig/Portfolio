document.addEventListener("DOMContentLoaded", () => {

    //  variables para manipular elementos del DOM
    const habitList = document.getElementById("habits");
    const addHabitBtn = document.getElementById("addHabitBtn");
    const progressDetails = document.getElementById("progressDetails");

    // cargar hábitos desde el almacenamiento local o inicializar un array vacío si no existe
    let habits = JSON.parse(localStorage.getItem("habits")) || [];

    // función para mostrar los hábitos
    const provideHabits = () => {
        habitList.innerHTML = "";    // limpiar la lista antes de actualizar para evitar duplicados

        // pasa por cada hábito en el array habits
        habits.forEach((habit, index) => {
            const habitItem = document.createElement("li");  // crea un elemento de la lista para cada hábito

            // crear elemento de texto del hábito
            const habitText = document.createElement("span");
            habitText.textContent = `${habit.name} - ${habit.frequency}`; // muestra la frecuencia y el hábito

            // aplicar la clase 'completed' si el hábito está completado (esto cambiará su color)
            habitText.classList.toggle("completed", habit.isCompleted);

            habitItem.appendChild(habitText);

            // botón para marcar hábito como completado
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Completar";
            completeBtn.classList.add("complete-btn");

            // deshabilitar si el hábito ya está completado
            completeBtn.disabled = habit.isCompleted;

            // evento para completar el hábito
            completeBtn.addEventListener("click", () => completeHabit(index)); 
            habitItem.appendChild(completeBtn);

            // botón para eliminar hábito
            const deleteHabitBtn = document.createElement("button");
            deleteHabitBtn.textContent = "Eliminar hábito";
            deleteHabitBtn.classList.add("delete-btn");

            // Evento para eliminar el hábito
            deleteHabitBtn.addEventListener("click", () => deleteHabit(index));
            habitItem.appendChild(deleteHabitBtn);

            habitList.appendChild(habitItem); // añadir el elemento de la lista a "habitList"
        });
    };

    // función para manejar la acción de completar
    const completeHabit = (index) => {
        if (!habits[index].isCompleted) {
            habits[index].isCompleted = true; // marcar el hábito como completado
            
            // guarda los hábitos actualizados en almacenamiento local
            localStorage.setItem("habits", JSON.stringify(habits));
            upgradeProgress();
            provideHabits(); // actualizar la visualización
        }
    };

    // función para actualizar el progreso general de todos los hábitos
    const upgradeProgress = () => {
        const completed = habits.filter(habit => habit.isCompleted).length;
        const total = habits.length;
        progressDetails.textContent = `Hábitos completados: ${completed} de ${total}`;
    };

    // función para agregar un nuevo hábito
    const addHabit = () => {
        const name = prompt("Hábito: ");
        const frequency = prompt("Frecuencia (diaria o semanal): ");
        
        if (name && frequency) {
            const habitExist = habits.find(habit => habit.name.toLowerCase() === name.toLowerCase());

            if (habitExist) {
                alert(`${habitExist.name} ya existe. Por favor ingresa un hábito diferente.`);
            } else {
                habits.push({ name, frequency, isCompleted: false }); // agregar hábito con 'isCompleted' en false
                localStorage.setItem("habits", JSON.stringify(habits));
                
                // actualizar interfaz
                provideHabits();
                upgradeProgress();
            }
        }
    };

    // función para eliminar hábito
    const deleteHabit = (index) => {
        const habitName = habits[index].name;
        const confirmDelete = confirm(`¿Estás seguro de eliminar el hábito?: ${habitName}`);

        if (confirmDelete) {
            habits.splice(index, 1); // eliminar el hábito del array
            localStorage.setItem("habits", JSON.stringify(habits));
            provideHabits();
            upgradeProgress();
        }
    };

    // event listener para agregar un nuevo hábito al hacer clic en añadir hábito
    addHabitBtn.addEventListener("click", addHabit);

    provideHabits();
    upgradeProgress();
});
