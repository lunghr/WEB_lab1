<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="index.css">
    <script src="index.js"></script>
    <title>Title</title>
</head>
<body>
<header>
    Тупиченко Милана Алексеевна
    <br>P3209  вариант 1975
</header>
<section id="data">
    <section class="input-container">
        <form id="user_input">
            <section id="data-input-container">
                <section id="x-input">
                    <label id="x-label">Choose x coordinate:</label>
                    <section id="x-buttons-container">
                        <?php
                        for ($i=-5; $i<=3; $i++){
                            echo"<input class='x-button' type='button' value='$i' onmouseover='scaleButton(this, 1.1)' onmouseout='scaleButtonOut(this, 1)'>";

                        }
                        ?>
                    </section>
                </section>
                <section id="y-input">
                    <label for="y-label">Enter y coordinate:</label>
                    <label for="y-input-field"></label><input id="y-input-field" type="number" placeholder="Enter num from -5 to 3">
                    <br>
                    <span id="y-error" >Incorrect Y parameter</span>

                </section>
                <section id="r-input">
                    <label for="r-label">Enter R parameter:</label>
                    <label for="r-input-field"></label><input id="r-input-field" type="number" placeholder='Enter num from 1 to 4'>
                    <br>
                    <span id="r-error" >Incorrect R parameter</span>
                </section>
            </section>
            <section id="submit-form">
                <button type="submit" id="submit-button" disabled="disabled">check</button>
            </section>
        </form>
        <div id="response"></div>
        <div id="picture">
            <img id="flower" src="images/waiting1.gif" alt="">
        </div>
    </section>

    <section class="output-container">
        <img id="gr" src="images/graphic.png" alt="">
        <section id="history-block">
            <section id="labels">
                <label id="history-label">Arguments</label>
                <label id="time-label">Time</label>
                <label id="exTime-label">Execution time</label>
            </section>
        <section id="history-section">
            <div id="history"></div>
            <div id="time"></div>
            <div id="execution-time"></div>
        </section>

        </section>
    </section>

</section>
</body>
</html>
