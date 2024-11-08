document.addEventListener("DOMContentLoaded", () =>{
    const habitList = document.getElementById("habits");
    const addHabitBtn = document.getElementById("addHabitBtn");
    const progressDetails = document.getElementById("progressDetails");

    let habits = JSON.parse(localStorage.getItem("habits")) || [];

    const provideHabits = () =>{
        habitList.innerHTML= "";
        habits.forEach((habit, index) => {
            const habitItem = document.createElement("li");
            habitItem.textContent = `${habit.name} - ${habit.frequency}`;
            habitList.appendChild(habitItem);

            //boton para marcar habito como completado
            const completeBtn = document.createElement("button");
            completeBtn.textContent ="Completar";
            habitItem.appendChild(completeBtn);
        });
    };

    const completeHabit = (index) => {
        
    }
})