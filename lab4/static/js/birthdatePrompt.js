const AGE_RESTRICTION = 18;
const SESSION_STORAGE_RESTRICTION_KEY = 'age-collected-key';

function calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday;
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function removeReaction(event) {
    event.preventDefault();
    event.stopPropagation();
}

function birthdatePromptMain() {
    const ageCollected = sessionStorage.getItem(SESSION_STORAGE_RESTRICTION_KEY);
    if (ageCollected) {
        return;
    }
    const header = document.querySelector('header');
    header.addEventListener("click", removeReaction);

    const birthdatePromptButton = document.getElementById('birthdate-prompt-button');
    const birthdatePrompt = document.getElementById('birthdate-prompt');
    birthdatePrompt.classList.remove('hidden');

    birthdatePromptButton.addEventListener('click', (e) => {
        e.preventDefault();
        const birthdate = new Date(document.getElementById('date').value);
        const age = calculateAge(birthdate);

        if (age >= AGE_RESTRICTION) {
            const weekday = birthdate.toLocaleString("en-US", {weekday: "long"})
            sessionStorage.setItem(SESSION_STORAGE_RESTRICTION_KEY, age);
            alert(`Your birthdate at ${weekday}`);
            birthdatePrompt.classList.add('hidden');
            header.removeEventListener("click", removeReaction)
        } else {
            alert(`Your must be above ${AGE_RESTRICTION} to view this site`);
        }
    });
}

birthdatePromptMain();