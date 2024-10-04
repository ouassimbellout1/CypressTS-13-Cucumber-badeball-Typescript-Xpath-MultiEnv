Feature: Data Driven with XLSX

    Background: Navigate to Google
        Given   J'accède a l'url "redux"

    Scenario: Invalid login with Excel file
        When    J'accède à la page login
        And     Je m'assure que le fichier excel est prèt
        Then    J'utilise "XLSX" pour se connecter
        And     Je retourne à la page d'accueil redux

    Scenario: Invalid login with Json file
        When    J'accède à la page login
        And     Je m'assure que le fichier excel est prèt
        Then    J'utilise "Json" pour se connecter
        And     Je retourne à la page d'accueil redux

    Scenario: Invalid login with data table
        When    J'accède à la page login
        Then    J'utilise "table" pour se connecter
                | email           | password |
                | user1@gmail.com | 123      |
                | user2@gmail.com | 456      |
                | user3@gmail.com | 789      |
                | user4@gmail.com | 753      |
        And     Je retourne à la page d'accueil redux

    Scenario: Invalid login with Random data table
        When    J'accède à la page login
        Then    J'utilise "table Random" pour se connecter
                | ligne | email           | password |
                | 1     | user1@gmail.com | 123      |
                | 2     | user2@gmail.com | 456      |
                | 3     | user3@gmail.com | 789      |
                | 4     | user4@gmail.com | 753      |
        And     Je retourne à la page d'accueil redux

    Scenario Outline: Invalid login with data table
        When    J'accède à la page login
        Then    J'utiliser table pour se connecter with "<email>" and "<password>"
        And     Je retourne à la page d'accueil redux

        Examples:
            | email           | password |
            | user1@gmail.com | 123      |
            | user2@gmail.com | 456      |
            | user3@gmail.com | 789      |
            | user4@gmail.com | 753      |