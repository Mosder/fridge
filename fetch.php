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
    echo json_encode($magnets);
}
else if (isset($_GET['add'])) {
    updateFridge($dbh, $_GET);
    $sth = $dbh->prepare("INSERT INTO magnets(IDofFridge, IDofFridgeMagnet, X, Y, Z, Width, Height, Content)
        values(:IDofFridge, :IDofFridgeMagnet, :X, :Y, :Z, :Width, :Height, :Content)");
    foreach ($_GET as $key => $val) {
        if ($key != "Name" && $key != "Total" && $key != "Remaining" && $key != "add") {
            $sth->bindValue(":" . $key, $val, PDO::PARAM_STR);
        }
    }
    $sth->execute();
    echo json_encode("ok");
}
else if (isset($_GET['change'])) {
    updateFridge($dbh, $_GET);
    $sth = $dbh->prepare("UPDATE magnets SET X = :X, Y = :Y, Z = :Z, Width = :Width, Height = :Height,
        Content = :Content WHERE IDofFridge = :IDofFridge AND IDofFridgeMagnet = :IDofFridgeMagnet");
    $i = 0;
    foreach ($_GET as $key => $val) {
        if ($key != "Name" && $key != "Total" && $key != "Remaining" && $key != "change") {
            $sth->bindValue(":" . $key, $val, PDO::PARAM_STR);
        }
    }
    $sth->execute();
    echo json_encode("ok");
}
else if (isset($_GET['delete'])) {
    updateFridge($dbh, $_GET);
    $sth = $dbh->prepare("DELETE FROM magnets WHERE IDofFridge = ? AND IDofFridgeMagnet = ?");
    $sth->bindValue(1, $_GET['IDofFridge'], PDO::PARAM_STR);
    $sth->bindValue(2, $_GET['IDofFridgeMagnet'], PDO::PARAM_STR);
    $sth->execute();
    echo json_encode("ok");
}

function updateFridge($dbh, $get) {
    $sth = $dbh->prepare('UPDATE fridges SET Total = ?, Remaining = ? WHERE IDofFridge = ?');
    $sth->bindValue(1, $get['Total'], PDO::PARAM_STR);
    $sth->bindValue(2, $get['Remaining'], PDO::PARAM_STR);
    $sth->bindValue(3, $get['IDofFridge'], PDO::PARAM_STR);
    $sth->execute();
}