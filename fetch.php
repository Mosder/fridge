<?php
require("pass.php");
$dbh = new PDO($dsn, $user, $password);
$dbh->exec("set names utf8");

if (isset($_GET['getF'])) {
    $name = $_GET['getF'];
    $sth = $dbh->prepare("SELECT * FROM fridges WHERE Name = ?");
    $sth->bindValue(1, $name, PDO::PARAM_STR);
    $sth->execute();
    $fridge = $sth->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($fridge)) {
        echo json_encode($fridge[0]);
    }
    else {
        $sth = $dbh->prepare("INSERT INTO fridges(Name, Total, Remaining) values(?, 0, 0)");
        $sth->bindValue(1, $name, PDO::PARAM_STR);
        $sth->execute();
        echo json_encode(array("IDofFridge" => $dbh->lastInsertId(), "Name" => $name, "Total" => 0, "Remaining" => 0));
    }
}
else if (isset($_GET['getM'])) {
    $id = $_GET['getM'];
    $sth = $dbh->prepare("SELECT * FROM magnets WHERE IDofFridge = ?");
    $sth->bindValue(1, $id, PDO::PARAM_INT);
    $sth->execute();
    $magnets = $sth->fetchAll(PDO::FETCH_ASSOC);
    for ($i = 0; $i < count($magnets); $i++) {
        $magnets[$i]['Content'] = $magnets[$i]['Content'];
    }
    echo json_encode($magnets);
}
else if (isset($_GET['add'])) {
    $data = getData($_GET['add']);
    updateFridge($dbh, $data['f']);
    $sth = $dbh->prepare("INSERT INTO magnets(IDofFridge, IDofFridgeMagnet, X, Y, Z, Width, Height, Content)
        values(:IDofFridge, :IDofFridgeMagnet, :X, :Y, :Z, :Width, :Height, :Content)");
    foreach ($data['m'] as $key => $val) {
        $sth->bindValue(":" . $key, $val, PDO::PARAM_STR);
    }
    $sth->execute();
    echo json_encode("ok");
}
else if (isset($_GET['change'])) {
    $data = getData($_GET['change']);
    updateFridge($dbh, $data['f']);
    $sth = $dbh->prepare("UPDATE magnets SET X = :X, Y = :Y, Z = :Z, Width = :Width, Height = :Height,
        Content = :Content WHERE IDofFridge = :IDofFridge AND IDofFridgeMagnet = :IDofFridgeMagnet");
    foreach ($data['m'] as $key => $val) {
        $sth->bindValue(":" . $key, $val, PDO::PARAM_STR);
    }
    $sth->execute();
    echo json_encode("ok");
}
else if (isset($_GET['delete'])) {
    $data = getData($_GET['delete']);
    updateFridge($dbh, $data['f']);
    $sth = $dbh->prepare("DELETE FROM magnets WHERE IDofFridge = ? AND IDofFridgeMagnet = ?");
    $sth->bindValue(1, $data['m']['IDofFridge'], PDO::PARAM_STR);
    $sth->bindValue(2, $data['m']['IDofFridgeMagnet'], PDO::PARAM_STR);
    $sth->execute();
    echo json_encode("ok");
}

function getData($query) {
    $query = explode('|', $query);
    $fridge = array();
    foreach(explode(',', $query[0]) as $x) {
        $x = explode(':', $x);
        $fridge[$x[0]] = $x[1];
    }
    $magnet = array();
    foreach(explode(',', $query[1]) as $x) {
        $x = explode(':', $x);
        $magnet[$x[0]] = $x[1];
        if ($x[0] == "Content")
            $magnet[$x[0]] = $x[1];
    }
    return array("f" => $fridge, "m" => $magnet);
}
function updateFridge($dbh, $fridge) {
    $sth = $dbh->prepare('UPDATE fridges SET Total = ?, Remaining = ? WHERE IDofFridge = ?');
    $sth->bindValue(1, $fridge['Total'], PDO::PARAM_STR);
    $sth->bindValue(2, $fridge['Remaining'], PDO::PARAM_STR);
    $sth->bindValue(3, $fridge['IDofFridge'], PDO::PARAM_STR);
    $sth->execute();
}