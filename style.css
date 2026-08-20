// ===============================
// DATA
// ===============================

let history =
    JSON.parse(
        localStorage.getItem("englishHistory")
    ) || [];


let quizQuestions = [];

let currentQuestion = 0;

let score = 0;

let xp = 0;

let answered = false;


// ===============================
// SEARCH WORD
// ===============================

async function analyzeWord() {

    const input =
        document.getElementById("wordInput");

    const status =
        document.getElementById("status");

    const result =
        document.getElementById("result");


    const word =
        input.value.trim().toLowerCase();


    if (word === "") {

        status.textContent =
            "Hãy nhập một từ tiếng Anh.";

        return;
    }


    status.textContent =
        "🔎 Đang tìm kiếm...";


    result.innerHTML = "";


    try {

        const response = await fetch(

            `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`

        );


        if (!response.ok) {

            throw new Error(
                "Không tìm thấy từ"
            );

        }


        const data =
            await response.json();


        const wordData =
            data[0];


        // HIỂN THỊ KẾT QUẢ

        renderResult(wordData);


        // LƯU VÀO HISTORY

        saveToHistory(wordData);


        status.textContent = "";


    } catch (error) {

        status.textContent =
            "❌ Không tìm thấy từ. Hãy thử lại.";

    }

}


// ===============================
// RENDER RESULT
// ===============================

function renderResult(data) {

    const result =
        document.getElementById("result");


    let html = `

        <div class="result">

            <h2 class="word">
                ${data.word}
            </h2>

            <p class="phonetic">
                ${data.phonetic || ""}
            </p>

    `;


    for (
        const meaning
        of data.meanings
    ) {

        html += `

            <div class="meaning">

                <div class="part-of-speech">

                    ${meaning.partOfSpeech}

                </div>

        `;


        for (
            const definition
            of meaning.definitions
        ) {

            html += `

                <p class="definition">

                    ${definition.definition}

                </p>

            `;


            if (
                definition.example
            ) {

                html += `

                    <p class="example">

                        Example:
                        ${definition.example}

                    </p>

                `;

            }

        }


        html += `

            </div>

        `;

    }


    html += `

        </div>

    `;


    result.innerHTML = html;

}


// ===============================
// SAVE HISTORY
// ===============================

function saveToHistory(data) {

    const existing =
        history.find(
            item =>
                item.word === data.word
        );


    if (existing) {

        return;

    }


    const firstMeaning =
        data.meanings[0];


    const firstDefinition =
        firstMeaning
            ?.definitions[0]
            ?.definition || "";


    const item = {

        word: data.word,

        partOfSpeech:
            firstMeaning
                ?.partOfSpeech || "",

        definition:
            firstDefinition,

        meanings:
            data.meanings

    };


    history.unshift(item);


    // Chỉ giữ 30 từ gần nhất

    if (history.length > 30) {

        history =
            history.slice(0, 30);

    }


    localStorage.setItem(
        "englishHistory",
        JSON.stringify(history)
    );


    renderHistory();

}


// ===============================
// SHOW HISTORY
// ===============================

function renderHistory() {

    const container =
        document.getElementById("history");


    if (history.length === 0) {

        container.innerHTML = `

            <p class="empty-history">

                Bạn chưa tra từ nào.

            </p>

        `;

        return;

    }


    let html = `

        <div class="history-list">

    `;


    for (
        const item
        of history
    ) {

        html += `

            <div
                class="history-card"
                onclick="showHistoryWord('${escapeQuotes(item.word)}')"
            >

                <div class="history-word">

                    ${item.word}

                </div>

                <div class="history-type">

                    ${item.partOfSpeech}

                </div>

            </div>

        `;

    }


    html += `

        </div>

    `;


    container.innerHTML = html;

}


// ===============================
// OPEN OLD WORD
// ===============================

function showHistoryWord(word) {

    const item =
        history.find(
            x => x.word === word
        );


    if (!item) {

        return;

    }


    renderResult({

        word: item.word,

        phonetic: "",

        meanings: item.meanings

    });


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ===============================
// START QUIZ
// ===============================

function startQuiz() {

    if (history.length < 2) {

        alert(
            "Bạn cần tra ít nhất 2 từ trước khi chơi Quiz!"
        );

        return;

    }


    quizQuestions =
        createQuizQuestions();


    currentQuestion = 0;

    score = 0;

    xp = 0;


    const quizSection =
        document.getElementById(
            "quizSection"
        );


    quizSection.classList.remove(
        "hidden"
    );


    showQuestion();


    quizSection.scrollIntoView({

        behavior: "smooth"

    });

}


// ===============================
// CREATE QUESTIONS
// ===============================

function createQuizQuestions() {

    const shuffled =
        [...history].sort(
            () => Math.random() - 0.5
        );


    const selected =
        shuffled.slice(
            0,
            Math.min(10, shuffled.length)
        );


    return selected.map(item => {

        const correct =
            item.definition;


        let wrongAnswers =
            history
                .filter(
                    x =>
                        x.word !== item.word
                )
                .map(
                    x => x.definition
                )
                .filter(
                    x => x && x !== correct
                );


        wrongAnswers =
            wrongAnswers.sort(
                () => Math.random() - 0.5
            );


        wrongAnswers =
            wrongAnswers.slice(0, 3);


        const options = [
            correct,
            ...wrongAnswers
        ];


        // Nếu chưa đủ 4 đáp án

        while (
            options.length < 4
        ) {

            options.push(
                "Another meaning"
            );

        }


        options.sort(
            () => Math.random() - 0.5
        );


        return {

            word: item.word,

            correct: correct,

            options: options

        };

    });

}


// ===============================
// SHOW QUESTION
// ===============================

function showQuestion() {

    const question =
        quizQuestions[
            currentQuestion
        ];


    const content =
        document.getElementById(
            "quizContent"
        );


    const progress =
        document.getElementById(
            "quizProgress"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    answered = false;


    nextButton.classList.add(
        "hidden"
    );


    progress.textContent =
        `${currentQuestion + 1} / ${quizQuestions.length}`;


    let html = `

        <div class="question">

            What does

            <strong>
                "${question.word}"
            </strong>

            mean?

        </div>


        <div class="options">

    `;


    question.options.forEach(
        (option, index) => {

            const letter =
                String.fromCharCode(
                    65 + index
                );


            html += `

                <button
                    class="option"
                    onclick="checkAnswer(
                        this,
                        '${escapeQuotes(option)}'
                    )"
                >

                    ${letter}. ${option}

                </button>

            `;

        }
    );


    html += `

        </div>

        <div
            id="feedback"
            class="quiz-feedback"
        ></div>

    `;


    content.innerHTML = html;

}


// ===============================
// CHECK ANSWER
// ===============================

function checkAnswer(
    button,
    selected
) {

    if (answered) {

        return;

    }


    answered = true;


    const question =
        quizQuestions[
            currentQuestion
        ];


    const feedback =
        document.getElementById(
            "feedback"
        );


    const allButtons =
        document.querySelectorAll(
            ".option"
        );


    allButtons.forEach(
        btn => {

            if (
                btn.textContent
                    .includes(
                        question.correct
                    )
            ) {

                btn.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selected ===
        question.correct
    ) {

        button.classList.add(
            "correct"
        );


        score++;

        xp += 10;


        feedback.textContent =
            "✅ Chính xác! +10 XP";


    } else {

        button.classList.add(
            "wrong"
        );


        feedback.textContent =
            `❌ Sai! Đáp án đúng là: ${question.correct}`;

    }


    document
        .getElementById(
            "nextButton"
        )
        .classList.remove(
            "hidden"
        );

}


// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        quizQuestions.length
    ) {

        showScore();

        return;

    }


    showQuestion();

}


// ===============================
// FINAL SCORE
// ===============================

function showScore() {

    const content =
        document.getElementById(
            "quizContent"
        );


    const progress =
        document.getElementById(
            "quizProgress"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    progress.textContent =
        "Completed";


    content.innerHTML = `

        <div class="score-box">

            <h2>
                🎉 Quiz hoàn thành!
            </h2>


            <div class="score">

                ${score}/${quizQuestions.length}

            </div>


            <div class="xp">

                ⭐ +${xp} XP

            </div>


            <p>

                ${
                    score ===
                    quizQuestions.length

                    ? "Perfect! 🔥"

                    : "Cố gắng thêm nhé! 💪"

                }

            </p>

        </div>

    `;


    nextButton.classList.add(
        "hidden"
    );

}


// ===============================
// SECURITY HELPER
// ===============================

function escapeQuotes(text) {

    return text
        .replaceAll(
            "'",
            "\\'"
        )
        .replaceAll(
            '"',
            '\\"'
        );

}


// ===============================
// LOAD HISTORY
// ===============================

renderHistory();// ===============================
// DATA
// ===============================

let history =
    JSON.parse(
        localStorage.getItem("englishHistory")
    ) || [];


let quizQuestions = [];

let currentQuestion = 0;

let score = 0;

let xp = 0;

let answered = false;


// ===============================
// SEARCH WORD
// ===============================

async function analyzeWord() {

    const input =
        document.getElementById("wordInput");

    const status =
        document.getElementById("status");

    const result =
        document.getElementById("result");


    const word =
        input.value.trim().toLowerCase();


    if (word === "") {

        status.textContent =
            "Hãy nhập một từ tiếng Anh.";

        return;
    }


    status.textContent =
        "🔎 Đang tìm kiếm...";


    result.innerHTML = "";


    try {

        const response = await fetch(

            `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`

        );


        if (!response.ok) {

            throw new Error(
                "Không tìm thấy từ"
            );

        }


        const data =
            await response.json();


        const wordData =
            data[0];


        // HIỂN THỊ KẾT QUẢ

        renderResult(wordData);


        // LƯU VÀO HISTORY

        saveToHistory(wordData);


        status.textContent = "";


    } catch (error) {

        status.textContent =
            "❌ Không tìm thấy từ. Hãy thử lại.";

    }

}


// ===============================
// RENDER RESULT
// ===============================

function renderResult(data) {

    const result =
        document.getElementById("result");


    let html = `

        <div class="result">

            <h2 class="word">
                ${data.word}
            </h2>

            <p class="phonetic">
                ${data.phonetic || ""}
            </p>

    `;


    for (
        const meaning
        of data.meanings
    ) {

        html += `

            <div class="meaning">

                <div class="part-of-speech">

                    ${meaning.partOfSpeech}

                </div>

        `;


        for (
            const definition
            of meaning.definitions
        ) {

            html += `

                <p class="definition">

                    ${definition.definition}

                </p>

            `;


            if (
                definition.example
            ) {

                html += `

                    <p class="example">

                        Example:
                        ${definition.example}

                    </p>

                `;

            }

        }


        html += `

            </div>

        `;

    }


    html += `

        </div>

    `;


    result.innerHTML = html;

}


// ===============================
// SAVE HISTORY
// ===============================

function saveToHistory(data) {

    const existing =
        history.find(
            item =>
                item.word === data.word
        );


    if (existing) {

        return;

    }


    const firstMeaning =
        data.meanings[0];


    const firstDefinition =
        firstMeaning
            ?.definitions[0]
            ?.definition || "";


    const item = {

        word: data.word,

        partOfSpeech:
            firstMeaning
                ?.partOfSpeech || "",

        definition:
            firstDefinition,

        meanings:
            data.meanings

    };


    history.unshift(item);


    // Chỉ giữ 30 từ gần nhất

    if (history.length > 30) {

        history =
            history.slice(0, 30);

    }


    localStorage.setItem(
        "englishHistory",
        JSON.stringify(history)
    );


    renderHistory();

}


// ===============================
// SHOW HISTORY
// ===============================

function renderHistory() {

    const container =
        document.getElementById("history");


    if (history.length === 0) {

        container.innerHTML = `

            <p class="empty-history">

                Bạn chưa tra từ nào.

            </p>

        `;

        return;

    }


    let html = `

        <div class="history-list">

    `;


    for (
        const item
        of history
    ) {

        html += `

            <div
                class="history-card"
                onclick="showHistoryWord('${escapeQuotes(item.word)}')"
            >

                <div class="history-word">

                    ${item.word}

                </div>

                <div class="history-type">

                    ${item.partOfSpeech}

                </div>

            </div>

        `;

    }


    html += `

        </div>

    `;


    container.innerHTML = html;

}


// ===============================
// OPEN OLD WORD
// ===============================

function showHistoryWord(word) {

    const item =
        history.find(
            x => x.word === word
        );


    if (!item) {

        return;

    }


    renderResult({

        word: item.word,

        phonetic: "",

        meanings: item.meanings

    });


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ===============================
// START QUIZ
// ===============================

function startQuiz() {

    if (history.length < 2) {

        alert(
            "Bạn cần tra ít nhất 2 từ trước khi chơi Quiz!"
        );

        return;

    }


    quizQuestions =
        createQuizQuestions();


    currentQuestion = 0;

    score = 0;

    xp = 0;


    const quizSection =
        document.getElementById(
            "quizSection"
        );


    quizSection.classList.remove(
        "hidden"
    );


    showQuestion();


    quizSection.scrollIntoView({

        behavior: "smooth"

    });

}


// ===============================
// CREATE QUESTIONS
// ===============================

function createQuizQuestions() {

    const shuffled =
        [...history].sort(
            () => Math.random() - 0.5
        );


    const selected =
        shuffled.slice(
            0,
            Math.min(10, shuffled.length)
        );


    return selected.map(item => {

        const correct =
            item.definition;


        let wrongAnswers =
            history
                .filter(
                    x =>
                        x.word !== item.word
                )
                .map(
                    x => x.definition
                )
                .filter(
                    x => x && x !== correct
                );


        wrongAnswers =
            wrongAnswers.sort(
                () => Math.random() - 0.5
            );


        wrongAnswers =
            wrongAnswers.slice(0, 3);


        const options = [
            correct,
            ...wrongAnswers
        ];


        // Nếu chưa đủ 4 đáp án

        while (
            options.length < 4
        ) {

            options.push(
                "Another meaning"
            );

        }


        options.sort(
            () => Math.random() - 0.5
        );


        return {

            word: item.word,

            correct: correct,

            options: options

        };

    });

}


// ===============================
// SHOW QUESTION
// ===============================

function showQuestion() {

    const question =
        quizQuestions[
            currentQuestion
        ];


    const content =
        document.getElementById(
            "quizContent"
        );


    const progress =
        document.getElementById(
            "quizProgress"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    answered = false;


    nextButton.classList.add(
        "hidden"
    );


    progress.textContent =
        `${currentQuestion + 1} / ${quizQuestions.length}`;


    let html = `

        <div class="question">

            What does

            <strong>
                "${question.word}"
            </strong>

            mean?

        </div>


        <div class="options">

    `;


    question.options.forEach(
        (option, index) => {

            const letter =
                String.fromCharCode(
                    65 + index
                );


            html += `

                <button
                    class="option"
                    onclick="checkAnswer(
                        this,
                        '${escapeQuotes(option)}'
                    )"
                >

                    ${letter}. ${option}

                </button>

            `;

        }
    );


    html += `

        </div>

        <div
            id="feedback"
            class="quiz-feedback"
        ></div>

    `;


    content.innerHTML = html;

}


// ===============================
// CHECK ANSWER
// ===============================

function checkAnswer(
    button,
    selected
) {

    if (answered) {

        return;

    }


    answered = true;


    const question =
        quizQuestions[
            currentQuestion
        ];


    const feedback =
        document.getElementById(
            "feedback"
        );


    const allButtons =
        document.querySelectorAll(
            ".option"
        );


    allButtons.forEach(
        btn => {

            if (
                btn.textContent
                    .includes(
                        question.correct
                    )
            ) {

                btn.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selected ===
        question.correct
    ) {

        button.classList.add(
            "correct"
        );


        score++;

        xp += 10;


        feedback.textContent =
            "✅ Chính xác! +10 XP";


    } else {

        button.classList.add(
            "wrong"
        );


        feedback.textContent =
            `❌ Sai! Đáp án đúng là: ${question.correct}`;

    }


    document
        .getElementById(
            "nextButton"
        )
        .classList.remove(
            "hidden"
        );

}


// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        quizQuestions.length
    ) {

        showScore();

        return;

    }


    showQuestion();

}


// ===============================
// FINAL SCORE
// ===============================

function showScore() {

    const content =
        document.getElementById(
            "quizContent"
        );


    const progress =
        document.getElementById(
            "quizProgress"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    progress.textContent =
        "Completed";


    content.innerHTML = `

        <div class="score-box">

            <h2>
                🎉 Quiz hoàn thành!
            </h2>


            <div class="score">

                ${score}/${quizQuestions.length}

            </div>


            <div class="xp">

                ⭐ +${xp} XP

            </div>


            <p>

                ${
                    score ===
                    quizQuestions.length

                    ? "Perfect! 🔥"

                    : "Cố gắng thêm nhé! 💪"

                }

            </p>

        </div>

    `;


    nextButton.classList.add(
        "hidden"
    );

}


// ===============================
// SECURITY HELPER
// ===============================

function escapeQuotes(text) {

    return text
        .replaceAll(
            "'",
            "\\'"
        )
        .replaceAll(
            '"',
            '\\"'
        );

}


// ===============================
// LOAD HISTORY
// ===============================

renderHistory();// ===============================
// DATA
// ===============================

let history =
    JSON.parse(
        localStorage.getItem("englishHistory")
    ) || [];


let quizQuestions = [];

let currentQuestion = 0;

let score = 0;

let xp = 0;

let answered = false;


// ===============================
// SEARCH WORD
// ===============================

async function analyzeWord() {

    const input =
        document.getElementById("wordInput");

    const status =
        document.getElementById("status");

    const result =
        document.getElementById("result");


    const word =
        input.value.trim().toLowerCase();


    if (word === "") {

        status.textContent =
            "Hãy nhập một từ tiếng Anh.";

        return;
    }


    status.textContent =
        "🔎 Đang tìm kiếm...";


    result.innerHTML = "";


    try {

        const response = await fetch(

            `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`

        );


        if (!response.ok) {

            throw new Error(
                "Không tìm thấy từ"
            );

        }


        const data =
            await response.json();


        const wordData =
            data[0];


        // HIỂN THỊ KẾT QUẢ

        renderResult(wordData);


        // LƯU VÀO HISTORY

        saveToHistory(wordData);


        status.textContent = "";


    } catch (error) {

        status.textContent =
            "❌ Không tìm thấy từ. Hãy thử lại.";

    }

}


// ===============================
// RENDER RESULT
// ===============================

function renderResult(data) {

    const result =
        document.getElementById("result");


    let html = `

        <div class="result">

            <h2 class="word">
                ${data.word}
            </h2>

            <p class="phonetic">
                ${data.phonetic || ""}
            </p>

    `;


    for (
        const meaning
        of data.meanings
    ) {

        html += `

            <div class="meaning">

                <div class="part-of-speech">

                    ${meaning.partOfSpeech}

                </div>

        `;


        for (
            const definition
            of meaning.definitions
        ) {

            html += `

                <p class="definition">

                    ${definition.definition}

                </p>

            `;


            if (
                definition.example
            ) {

                html += `

                    <p class="example">

                        Example:
                        ${definition.example}

                    </p>

                `;

            }

        }


        html += `

            </div>

        `;

    }


    html += `

        </div>

    `;


    result.innerHTML = html;

}


// ===============================
// SAVE HISTORY
// ===============================

function saveToHistory(data) {

    const existing =
        history.find(
            item =>
                item.word === data.word
        );


    if (existing) {

        return;

    }


    const firstMeaning =
        data.meanings[0];


    const firstDefinition =
        firstMeaning
            ?.definitions[0]
            ?.definition || "";


    const item = {

        word: data.word,

        partOfSpeech:
            firstMeaning
                ?.partOfSpeech || "",

        definition:
            firstDefinition,

        meanings:
            data.meanings

    };


    history.unshift(item);


    // Chỉ giữ 30 từ gần nhất

    if (history.length > 30) {

        history =
            history.slice(0, 30);

    }


    localStorage.setItem(
        "englishHistory",
        JSON.stringify(history)
    );


    renderHistory();

}


// ===============================
// SHOW HISTORY
// ===============================

function renderHistory() {

    const container =
        document.getElementById("history");


    if (history.length === 0) {

        container.innerHTML = `

            <p class="empty-history">

                Bạn chưa tra từ nào.

            </p>

        `;

        return;

    }


    let html = `

        <div class="history-list">

    `;


    for (
        const item
        of history
    ) {

        html += `

            <div
                class="history-card"
                onclick="showHistoryWord('${escapeQuotes(item.word)}')"
            >

                <div class="history-word">

                    ${item.word}

                </div>

                <div class="history-type">

                    ${item.partOfSpeech}

                </div>

            </div>

        `;

    }


    html += `

        </div>

    `;


    container.innerHTML = html;

}


// ===============================
// OPEN OLD WORD
// ===============================

function showHistoryWord(word) {

    const item =
        history.find(
            x => x.word === word
        );


    if (!item) {

        return;

    }


    renderResult({

        word: item.word,

        phonetic: "",

        meanings: item.meanings

    });


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ===============================
// START QUIZ
// ===============================

function startQuiz() {

    if (history.length < 2) {

        alert(
            "Bạn cần tra ít nhất 2 từ trước khi chơi Quiz!"
        );

        return;

    }


    quizQuestions =
        createQuizQuestions();


    currentQuestion = 0;

    score = 0;

    xp = 0;


    const quizSection =
        document.getElementById(
            "quizSection"
        );


    quizSection.classList.remove(
        "hidden"
    );


    showQuestion();


    quizSection.scrollIntoView({

        behavior: "smooth"

    });

}


// ===============================
// CREATE QUESTIONS
// ===============================

function createQuizQuestions() {

    const shuffled =
        [...history].sort(
            () => Math.random() - 0.5
        );


    const selected =
        shuffled.slice(
            0,
            Math.min(10, shuffled.length)
        );


    return selected.map(item => {

        const correct =
            item.definition;


        let wrongAnswers =
            history
                .filter(
                    x =>
                        x.word !== item.word
                )
                .map(
                    x => x.definition
                )
                .filter(
                    x => x && x !== correct
                );


        wrongAnswers =
            wrongAnswers.sort(
                () => Math.random() - 0.5
            );


        wrongAnswers =
            wrongAnswers.slice(0, 3);


        const options = [
            correct,
            ...wrongAnswers
        ];


        // Nếu chưa đủ 4 đáp án

        while (
            options.length < 4
        ) {

            options.push(
                "Another meaning"
            );

        }


        options.sort(
            () => Math.random() - 0.5
        );


        return {

            word: item.word,

            correct: correct,

            options: options

        };

    });

}


// ===============================
// SHOW QUESTION
// ===============================

function showQuestion() {

    const question =
        quizQuestions[
            currentQuestion
        ];


    const content =
        document.getElementById(
            "quizContent"
        );


    const progress =
        document.getElementById(
            "quizProgress"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    answered = false;


    nextButton.classList.add(
        "hidden"
    );


    progress.textContent =
        `${currentQuestion + 1} / ${quizQuestions.length}`;


    let html = `

        <div class="question">

            What does

            <strong>
                "${question.word}"
            </strong>

            mean?

        </div>


        <div class="options">

    `;


    question.options.forEach(
        (option, index) => {

            const letter =
                String.fromCharCode(
                    65 + index
                );


            html += `

                <button
                    class="option"
                    onclick="checkAnswer(
                        this,
                        '${escapeQuotes(option)}'
                    )"
                >

                    ${letter}. ${option}

                </button>

            `;

        }
    );


    html += `

        </div>

        <div
            id="feedback"
            class="quiz-feedback"
        ></div>

    `;


    content.innerHTML = html;

}


// ===============================
// CHECK ANSWER
// ===============================

function checkAnswer(
    button,
    selected
) {

    if (answered) {

        return;

    }


    answered = true;


    const question =
        quizQuestions[
            currentQuestion
        ];


    const feedback =
        document.getElementById(
            "feedback"
        );


    const allButtons =
        document.querySelectorAll(
            ".option"
        );


    allButtons.forEach(
        btn => {

            if (
                btn.textContent
                    .includes(
                        question.correct
                    )
            ) {

                btn.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selected ===
        question.correct
    ) {

        button.classList.add(
            "correct"
        );


        score++;

        xp += 10;


        feedback.textContent =
            "✅ Chính xác! +10 XP";


    } else {

        button.classList.add(
            "wrong"
        );


        feedback.textContent =
            `❌ Sai! Đáp án đúng là: ${question.correct}`;

    }


    document
        .getElementById(
            "nextButton"
        )
        .classList.remove(
            "hidden"
        );

}


// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        quizQuestions.length
    ) {

        showScore();

        return;

    }


    showQuestion();

}


// ===============================
// FINAL SCORE
// ===============================

function showScore() {

    const content =
        document.getElementById(
            "quizContent"
        );


    const progress =
        document.getElementById(
            "quizProgress"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    progress.textContent =
        "Completed";


    content.innerHTML = `

        <div class="score-box">

            <h2>
                🎉 Quiz hoàn thành!
            </h2>


            <div class="score">

                ${score}/${quizQuestions.length}

            </div>


            <div class="xp">

                ⭐ +${xp} XP

            </div>


            <p>

                ${
                    score ===
                    quizQuestions.length

                    ? "Perfect! 🔥"

                    : "Cố gắng thêm nhé! 💪"

                }

            </p>

        </div>

    `;


    nextButton.classList.add(
        "hidden"
    );

}


// ===============================
// SECURITY HELPER
// ===============================

function escapeQuotes(text) {

    return text
        .replaceAll(
            "'",
            "\\'"
        )
        .replaceAll(
            '"',
            '\\"'
        );

}


// ===============================
// LOAD HISTORY
// ===============================

renderHistory();
