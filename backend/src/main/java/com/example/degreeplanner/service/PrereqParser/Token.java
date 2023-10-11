package com.example.degreeplanner.service.PrereqParser;

public class Token {
    /**
     * Token class used when tokenizing prereq strings.
     */

    public enum Type {OR, AND, INT, COLLEGE, CODE, WORD, LBRA, RBRA}

    private final String token;
    private final Type type;

    /**
     * Constructor for token class
     * @param value The value stored in the token, for example an INT token might contain a value of 6 or 12.
     * @param type The type of the token, for example: OR, AND, INT.
     */
    public Token(String value, Type type) {
        this.token = value;
        this.type = type;
    }

    /**
     * A method used to get the value stored inside the token.
     * @return A String representing the value stored in the token.
     */
    public String getValue() {
        return this.token;
    }

    /**
     * A method used to get the tokens Type.
     * @return A Type representing the type of the token.
     */
    public Type getType() {
        return this.type;
    }

    /**
     * A method which pretty prints the token depending on what its type is.
     * @return A String which describes the token and its value.
     */
    public String toString() {
        if (this.type == Type.INT || this.type == Type.COLLEGE || this.type == Type.CODE) {
            return this.type + "(" + this.token + ")";
        } else if (this.type == Type.WORD) {
            return this.token;
        }

        return this.type.toString();
    }

}
