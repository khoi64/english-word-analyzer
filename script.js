async function analyzeWord() {

    const input = document.getElementById("wordInput");

    const status = document.getElementById("status");

    const result = document.getElementById("result");


    const word = input.value.trim();


    if (word === "") {

        status.textContent = "Hãy nhập một từ tiếng Anh.";

        result.innerHTML = "";

        return;
    }


    status.textContent = "Đang tìm kiếm...";

    result.innerHTML = "";


    try {

        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );


        if (!response.ok) {

            throw new Error("Không tìm thấy từ");

        }


        const data = await response.json();


        const wordData = data[0];


        let html = `

            <div class="result">

                <h2 class="word">
                    ${wordData.word}
                </h2>

                <p class="phonetic">
                    ${wordData.phonetic || ""}
                </p>

        `;


        for (const meaning of wordData.meanings) {

            html += `

                <div class="meaning">

                    <div class="part-of-speech">

                        ${meaning.partOfSpeech}

                    </div>

            `;


            for (const definition of meaning.definitions) {

                html += `

                    <p class="definition">

                        ${definition.definition}

                    </p>

                `;


                if (definition.example) {

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


        status.textContent = "";


    } catch (error) {

        status.textContent =
            "Không tìm thấy từ. Hãy kiểm tra lại.";

    }

}
