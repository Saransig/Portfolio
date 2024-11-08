//espera a que el contenido del DOM este completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () =>{

    //  variables para manipular elementos del DOM
    const habitList = document.getElementById("habits");
    const addHabitBtn = document.getElementById("addHabitBtn");
    const progressDetails = document.getElementById("progressDetails");

    //cargar habitos desde el almacenamiento local o inicializar un array vacio si no existe
    let habits = JSON.parse(localStorage.getItem("habits")) || [];

    //funcion para mostrar los hábitos
    const provideHabits = () =>{
        habitList.innerHTML= "";    //limpiar la lista antes de actualizar para evitar duplicados

        //pasa por cada habito en el array habits
        habits.forEach((habit, index) => {
            const habitItem = document.createElement("li");         //crea un elemento de la lista para cada hábito
            habitItem.textContent = `${habit.name} - ${habit.frequency}`;           //muestra la frecuencia y el habito
            habitList.appendChild(habitItem);           //añadir el elemento de la lista a la seccion habitList

            //boton para marcar habito como completado
            const completeBtn = document.createElement("button");
            completeBtn.textContent ="Completar";
            habitItem.appendChild(completeBtn);

            //evento para completar el habito
            completeBtn.addEventListener("click", () => {
                completeHabit(index);       //completa el hábito con el indice actual
            });

            //boton para eliminar hábito
            const deleteHabitBtn = document.createElement("button");
            deleteHabitBtn.textContent = "Eliminar hábito";
            habitItem.appendChild(deleteHabitBtn);

            //Eveneto para eliminar el hábito
            deleteHabitBtn.addEventListener("click", ()=> {
                deleteHabit(index);         //llama a la funcion para eliminar el habito
            });

            habitList.appendChild(habitItem);           //añadir el elemento de la lista a "habitList"

        });
    };

    //funcion para manejar la accion de completar
    const completeHabit = (index) => {
        //incrementa el progreso del hábito
        habits[index].progress++;
        //guarda los habitos actualizados en almacenamiento local
        localStorage.setItem("habits", JSON.stringify(habits));
        upgradeProgress();
        provideHabits();
    };

    //funcion para actuaizar el progreso general de todos los habitos
    const upgradeProgress = () => {
        //sumar el progreso de todos los habitso completados
        const completed = habits.reduce((acc, habit) => acc + habit.progress,0);
        const total = habits.length;
        progressDetails.textContent = `Hábitos completados: ${completed} de ${total}`;
    };


    //funcion para agregar un nuevo hábito
    const addHabit = () =>{
        const name = prompt("Hábito: ");
        const frequency = prompt("Frecuencia (diara o semanal): ");
        
        //verificar que el nombre y la frecuecia sean validos antes de añadirlos
        if(name && frequency){
            //comprobar si ya existe
            const habitExist = habits.find(habit => habit.name.toLowerCase() === name.toLocaleLowerCase());

            if(habitExist){
                alert(`${habitExist.name} ya existe. Por favor ingresa uno hábito diferente.`);
            }else{

                //agrega el nuevo hábito al array con progreso a 0
                habits.push({name, frequency, progress: 0});
                localStorage.setItem("habits", JSON.stringify(habits));
                
                //actualizar interfaz de navegador
                provideHabits();
                upgradeProgress();
            }
        }
    };


    //funcion para eliminar hábito
    const deleteHabit = (index) =>{
        const habitName = habits[index].name;
        const confirmDelete = confirm(`¿estás seguro de eliminar el hábito?: ${habitName}`);

        if(confirmDelete){
            habits.splice(index,1);             //eliminar el habito del array
            localStorage.setItem("habits", JSON.stringify(habits));         //actualizar almacenamiento local
      
            provideHabits();
            upgradeProgress();
            
        }
    };

    //event listener para agregar un nuevo hábito al hacer clic en añadir hábito
    addHabitBtn.addEventListener("click", addHabit);

    provideHabits();
    upgradeProgress();
})