document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const submitBtn = document.getElementById('submitBtn');
    const subtitle = document.querySelector('.subtitle');
    const questionText = document.querySelector('.container > p');

    // Variables pour suivre les statistiques
    let currentQuestion = 1;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let totalQuestions = 10;

    // Base de questions
    const questions = [
        {
            text: "Combien y a-t-il de monstres de plus sur PoE2 sachant que sur Diablo 4 il y a ~64 monstres (boss/élite inclus) alors que sur PoE2 il y a 600 monstres et 100 boss et que la MAJ du 4 avril ajoute ~100 monstres et ~20 boss ?",
            answer: 756,
            explanation: "Calcul: PoE2 (600 + 100 + 100 + 20 = 820 monstres) - Diablo 4 (64 monstres) = 756 monstres de plus."
        },
        {
            text: "Combien de mods uniques de support de gems existent dans Path of Exile 2 à sa sortie ?",
            answer: 42,
            explanation: "Le jeu propose 42 mods uniques de support de gems à sa sortie."
        },
        {
            text: "Quel est le nombre total de classes de personnages jouables dans Path of Exile 2 ?",
            answer: 7,
            explanation: "Path of Exile 2 proposera 12 classes jouables, a l'heure actuelle il y en a 7."
        },
        {
            text: "En quelle année la première version de Path of Exile est-elle sortie ?",
            answer: 2013,
            explanation: "Path of Exile est sorti officiellement en 2013, après une phase de bêta."
        },
        {
            text: "Combien de types d'armes différentes peut-on utiliser dans Path of Exile 2 ?",
            answer: 15,
            explanation: "Path of Exile 2 propose 15 types d'armes différentes."
        },
        {
            text: "Quel est le nom de la première extension de Path of Exile ?",
            answer: 2013,
            explanation: "La première extension de Path of Exile s'appelle 'The Awakening' et est sortie en 2015."
        },
        {
            text: "Quel est le nom du système de gemmes dans Path of Exile 2 ?",
            answer:  'gems'201,
            explanation: "Le système de gemmes utilise des gemmes de compétence pour personnaliser les compétences des personnages."
        },
        {
            text: "Combien de temps dure une saison dans Path of Exile 2 ?",
            answer: 3,
            explanation: "Une saison dure généralement 3 mois dans Path of Exile 2."
        },
        {
            text: "Quel est le nom du moteur graphique utilisé dans Path of Exile 2 ?",
            answer: 'Moteur graphique propriétaire' 1054,
            explanation: "Path of Exile 2 utilise un moteur graphique propriétaire développé par Grinding Gear Games."
        },
        {
            text: "Quel est le nom du système de ligues dans Path of Exile 2 ?",
            answer: 'Système de ligues' 404,
            explanation: "Le système de ligues permet aux joueurs d'explorer de nouvelles mécaniques et défis à chaque saison."
        }
    ];

    // Mettre à jour le sous-titre avec le numéro de question actuel
    updateSubtitle();

    submitBtn.addEventListener('click', () => {
        checkAnswer();
    });

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    function updateSubtitle() {
        subtitle.textContent = `maxi question ${currentQuestion}/${totalQuestions} - Score: ${correctAnswers} bonnes, ${incorrectAnswers} mauvaises`;
    }

    function loadQuestion(questionIndex) {
        // Vérifier si toutes les questions ont été répondues
        if (currentQuestion > totalQuestions) {
            return null; // Ne pas charger de nouvelle question
        }
    
        // Charger la question actuelle
        const index = questionIndex % questions.length;
        questionText.textContent = questions[index].text;
        return questions[index];
    }
    
    function nextQuestion() {
        // Vérifier si toutes les questions ont été répondues
        if (currentQuestion >= totalQuestions) {
            // Supprimer le formulaire et afficher le message final
            const formGroup = document.querySelector('.form-group');
            if (formGroup) {
                formGroup.remove();
            }
    
            const finalMessage = document.createElement('div');
            finalMessage.className = 'final-message';
    
            if (correctAnswers > 5) {
                finalMessage.textContent = `Félicitations ! Vous avez terminé le questionnaire avec ${correctAnswers} bonnes réponses sur ${totalQuestions}.`;
                finalMessage.classList.add('success');
            } else {
                finalMessage.textContent = `Vous avez terminé le questionnaire avec ${correctAnswers} bonnes réponses sur ${totalQuestions}. Essayez de faire mieux la prochaine fois !`;
                finalMessage.classList.add('failure');
            }
    
            // Ajouter le message final au conteneur principal
            const container = document.querySelector('.container');
            container?.appendChild(finalMessage);
    
            return;
        }
    
        // Incrémenter le numéro de question
        currentQuestion++;
    
        // Mettre à jour le sous-titre
        updateSubtitle();
    
        // Réinitialiser le champ de saisie
        userInput.value = '';
        userInput.focus();
    
        // Supprimer le résultat précédent
        const oldResult = document.querySelector('.result');
        if (oldResult) {
            oldResult.remove();
        }
    
        // Charger la question suivante
        loadQuestion(currentQuestion - 1);
    }

    function checkAnswer() {
        const currentQuestionData = loadQuestion(currentQuestion - 1);
        const correctAnswer = currentQuestionData.answer;
        const userAnswer = parseInt(userInput.value.trim());

        // Supprimer un message de résultat précédent s'il existe
        const oldResult = document.querySelector('.result');
        if (oldResult) {
            oldResult.remove();
        }

        // Créer un élément pour afficher le résultat
        const resultElement = document.createElement('div');
        resultElement.className = 'result';

        if (isNaN(userAnswer)) {
            resultElement.textContent = 'Veuillez entrer un nombre valide.';
            resultElement.classList.add('error');
        } else if (userAnswer === correctAnswer) {
            resultElement.textContent = 'Bravo ! C\'est la bonne réponse.';
            resultElement.classList.add('correct');
            correctAnswers++; // Incrémenter les bonnes réponses
        } else {
            resultElement.textContent = `Désolé, ce n'est pas correct. La bonne réponse est ${correctAnswer}.`;
            resultElement.classList.add('incorrect');
            incorrectAnswers++; // Incrémenter les mauvaises réponses

            // Explication du calcul
            const explanation = document.createElement('p');
            explanation.textContent = currentQuestionData.explanation;
            resultElement.appendChild(explanation);
        }

        // Mettre à jour le sous-titre avec les statistiques
        updateSubtitle();

        // Ajouter un bouton pour passer à la question suivante
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Question suivante';
        nextButton.classList.add('next-btn');
        nextButton.addEventListener('click', nextQuestion);
        resultElement.appendChild(nextButton);

        // Ajouter le résultat après le formulaire
        const formGroup = document.querySelector('.form-group');
        formGroup?.parentNode?.insertBefore(resultElement, formGroup.nextSibling);
    }
});

const wikiIsOpen = false;
const wikiButton = document.getElementById('wikiBtn');
const wikiContent = document.getElementById('wikiContent');
const wikiCloseBtn = document.getElementById('wikiCloseBtn');

function toggleWiki() {
    if (wikiIsOpen) {
        wikiContent.style.display = 'none';
    } else {
        wikiContent.style.display = 'block';
    }
}
wikiButton.addEventListener('click', toggleWiki);

wikiCloseBtn.addEventListener('click', () => {
    wikiContent.style.display = 'none';
}
);
document.addEventListener('click', (event) => {
    if (!wikiContent.contains(event.target) && event.target !== wikiButton) {
        wikiContent.style.display = 'none';
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const tooltipButton1 = document.getElementById('tooltipBtn1');
    const tooltipButton2 = document.getElementById('tooltipBtn2');
    const tooltipButton3 = document.getElementById('tooltipBtn3');
    const tooltipContent = document.getElementById('tooltipContent');

    const tooltips = [
        {
            button: tooltipButton1,
            title: 'Path of Exile 2',
            content: 'Path of Exile 2 est un jeu d\'action-RPG développé par Grinding Gear Games. Il est la suite de Path of Exile et propose de nouvelles mécaniques de jeu, des graphismes améliorés et un monde étendu. sorti en accès anticipé le 6 déc. 2024.',
        },
        {
            button: tooltipButton2,
            title: 'Classes de personnages',
            content: 'Path of Exile 2 propose 12 classes jouables, chacune avec ses propres mécaniques et arbre de compétences.',
        },
        {
            button: tooltipButton3,
            title: 'Système de gemmes',
            content: 'Le jeu utilise un système unique de gemmes pour personnaliser les compétences des personnages, avec 42 mods uniques de support à la sortie du jeu.',
        }
    ];

    document.addEventListener('click', (event) => {
        const clickedTooltip = tooltips.find(tooltip => event.target === tooltip.button);

        if (clickedTooltip) {
            tooltipContent.innerHTML = `<strong>${clickedTooltip.title}</strong><br>${clickedTooltip.content}`;
        } else if (!tooltipContent.contains(event.target) &&
            !tooltips.some(tooltip => event.target === tooltip.button)) {
            tooltipContent.innerHTML = ''; // Réinitialiser le contenu si on clique ailleurs
        }
    });
});