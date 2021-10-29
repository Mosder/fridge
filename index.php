<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fridge</title>
    <link rel="stylesheet" href="style.css">
    <script
        src="https://cdn.tiny.cloud/1/s50o1drzeq136sblv5lon7ji7r5esiq2o5ycwl1kwwypxa91/tinymce/5/tinymce.min.js"></script>
    <script src="./dist/index.bundle.js" defer></script>
</head>

<body>
    <div id="fridge">
        <button id="add"></button>
        <p id="total">Total: 0</p>
        <p id="remaining">Remaining: 0</p>
        <div id="editor">
            <textarea id="tinymce"></textarea>
        </div>
    </div>
    <div id="getter">
        <label>Enter fridge name:</label>
        <input id="input" type="text"/>
        <button id="get"></button>
    </div>
</body>

</html>