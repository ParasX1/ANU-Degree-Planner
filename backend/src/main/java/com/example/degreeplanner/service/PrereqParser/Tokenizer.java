package com.example.degreeplanner.service.PrereqParser;

public class Tokenizer {
    /*
      The Tokenizer class creates a tokenizer that takes a formatted prerequisite String and tokenizes it into
      the tokens that can be found in Token.java

     */

    /**
     * IllegalTokenizerException is used when a string/word cannot be tokenized properly. This usually happens when the
     * input string is formatted incorrectly.
     */
    public static class IllegalTokenizerException extends IllegalArgumentException {
        public IllegalTokenizerException(String errorMessage) {
            super(errorMessage);
        }
    }

    String buffer;
    private Token currentToken;

    /**
     * Constructor for the tokenizer class.
     * @param prereqs A formatted pre-requisite string for a course.
     */
    public Tokenizer(String prereqs) {
        buffer = prereqs.toUpperCase();
        next();
    }

    /**
     * //TODO: Add ability for tokenizer to check that the input string is formatted correctly.
     * The next() method creates a new token for the next "word" in the prereq string. It then updates the
     * currentToken field to the new token. next() assumes that the string is formatted correctly.
     */
    public void next() {
        //Get rid of whitespace from the string
        buffer = buffer.trim();

        //If there is no more text to tokenize then set the current token to null.
        if (buffer.isEmpty()) {
            currentToken = null;
            return;
        }

        char firstChar = buffer.charAt(0);

        //Check to see if character is valid, if not throw an error
        if (firstChar != '(' && firstChar != ')' && !Character.isLetterOrDigit(firstChar)) {
            throw new IllegalTokenizerException("Invalid character in pre requisite string. Must contain only " +
                    "letters, numbers, or brackets");
        }

        if (firstChar == '(') {
            currentToken = new Token("(", Token.Type.LBRA);

        } else if (firstChar == ')') {
            currentToken = new Token(")", Token.Type.RBRA);

        } else if (Character.isDigit(firstChar)) {
            currentToken = tokenizeInteger();

        } else if (Character.isLetter(firstChar)) {
            currentToken = tokenizeWord();
        }

        //Remove the token from the string.
        int tokenLength = currentToken.getValue().length();
        buffer = buffer.substring(tokenLength);

    }

    /**
     * Method used to tokenize a word in the prereq string to an integer.
     * @return A Token representing the integer that is tokenized.
     */
    private Token tokenizeInteger() {
        StringBuilder numberString = new StringBuilder();

        // Loop through the next numbers in the buffer, adding them to the current number.
        // If the character is a letter then the string is formatted incorrectly.
        for (int i = 0; i < buffer.length(); i++) {
            if (Character.isDigit(buffer.charAt(i))) {
                numberString.append(buffer.charAt(i));
            } else if (Character.isLetter(buffer.charAt(i))) {
                throw new IllegalTokenizerException("Numbers can only be followed by whitespace or brackets");
            } else {
                break;
            }
        }

        //Create a new INT token, using the integer obtained.
        return new Token(numberString.toString(), Token.Type.INT);
    }

    /**
     * Method used to tokenize a word in the prereq string to its respective token.
     * @return A Token representing the word that is tokenized.
     */
    private Token tokenizeWord() {
        //Initialize an empty string to represent the word, create a boolean to check if the word contains a digit.
        StringBuilder word = new StringBuilder();
        boolean containsNumber = false;

        //Add each character to the current word, if a digit is followed by a letter the string is formatted incorrectly.
        for (int i = 0; i < buffer.length(); i++) {

            if (Character.isLetter(buffer.charAt(i))) {
                if (containsNumber) {
                    throw new IllegalTokenizerException("Numbers can only be followed by whitespace or brackets");
                } else {
                    word.append(buffer.charAt(i));
                }

            } else if (Character.isDigit(buffer.charAt(i))) {
                word.append(buffer.charAt(i));
                containsNumber = true;

            } else {
                break;
            }
        }

        if (word.toString().equals("AND")) {
            return new Token("AND", Token.Type.AND);
        }
        if (word.toString().equals("OR")) {
            return new Token("OR", Token.Type.OR);
        }

        if (word.length() == 4 && !containsNumber) {
            return new Token(word.toString(), Token.Type.COLLEGE);
        }
        if (word.length() == 8 && containsNumber) {
            return new Token(word.toString(), Token.Type.CODE);
        }

        return new Token(word.toString(), Token.Type.WORD);
    }

    /**
     * A method to get the current token stored in the Tokenizer.
     * @return a Token representing the current token stored in the tokenizer.
     */
    public Token current() {
        return currentToken;
    }

}
