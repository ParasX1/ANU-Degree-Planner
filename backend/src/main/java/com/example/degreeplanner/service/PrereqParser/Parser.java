package com.example.degreeplanner.service.PrereqParser;

public class Parser {
    /*
      Parser class used to parse tokens from a prerequisite string into expressions (Exp) that can be evaluated to
      check if a course's prerequisites are fulfilled.
      The parser template is as follows:
     <exp> -> <term> | <term> OR <exp>
     <term> -> <factor> | <factor> AND <term>
     <factor> -> <prereq> | (<exp>)
     <prereq> -> <college><code> | <int> UNITS <levelReq>
     <levelReq> -> <softReq> | <hardReq>
     <softReq> -> <college> COURSES
     <hardReq> -> <int> LEVEL <college> COURSES
     */

    /**
     * IllegalParserException is an exception that is thrown when an incorrect token is parsed. This usually happens
     * when the prerequisite string is formatted incorrectly.
     */
    public static class IllegalParserException extends IllegalArgumentException {
        public IllegalParserException(String errorMessage) {
            super(errorMessage);
        }
    }

    private final Tokenizer tokenizer;

    /**
     * Constructor for the Parser class, takes a pre req tokenizer as input.
     * @param tokenizer A prerequisite string tokenizer from the Tokenizer class.
     */
    public Parser(Tokenizer tokenizer) {
        this.tokenizer = tokenizer;
    }

    /**
     * parseExp parses the entire prerequisite string that is stored in the tokenizer. It returns an Exp which can
     * be evaluated to see if the prerequisites are met in the degree plan.
     * @return An expression which can be evaluated to check if the pre-requisites listed in the tokenizers prereq string
     * are fulfilled.
     */
    public Exp parseExp() {

        //If there are no prerequisites, return a nullExp
        Token firstToken = tokenizer.current();
        if (firstToken == null)
            return new Exp.NullExp();


        //The first exp must always be a term.
        Exp term = parseTerm();

        //If there is no other expression left to parse then return the term.
        Token operator = tokenizer.current();
        if (operator == null) {
            return term;
        }

        //If there is an OR token, then we must parse another expression.
        if (operator.getType() == Token.Type.OR) {
            tokenizer.next();
            return new Exp.OrExp(term, parseExp());
        }

        //If there is a token, but it is not an OR, the term must be a part of another expression.
        return term;

    }

    /**
     * parseTerm is the method used to parse terms in a prerequisite string.
     *
     * @return either a term expression, or an AND expression which contains a term and a pre-requisite.
     */
    private Exp parseTerm() {

        //The first expression in a term must be a factor.
        Exp factor = parseFactor();

        //If there are no expressions left, return the factor.
        Token operator = tokenizer.current();
        if (operator == null) {
            return factor;
        }

        //If there is an AND token, parse another term and return both.
        if (operator.getType() == Token.Type.AND) {
            tokenizer.next();
            return new Exp.AndExp(factor, parseTerm());
        }

        //If there is another token that is not an AND, it must be a part of a different expression, so return term.
        return factor;
    }

    /**
     * parseFactor parses the factors in a prerequisite string.
     * @return an Exp which is either a bracketed <exp> or a <prereq>
     */
    private Exp parseFactor() {
        //If the current token is a bracket, then parse a bracketed expression.
        Token current = tokenizer.current();
        if (current.getType() == Token.Type.LBRA) {
            tokenizer.next();
            Exp braExp = new Exp.BracExp(parseExp());
            tokenizer.next();
            return braExp;
        }

        //Otherwise return the parsed prereq.
        return parsePrereq();

    }

    /**
     * parseCourse parses a course code and returns an expression which can be evaluated to check if that course is
     * satisfied in the degree plan.
     * @return a CourseExp which can be evaluated to see if the course is in the degree plan.
     */
    private Exp parseCourse() {
        String code = tokenizer.current().getValue();
        tokenizer.next();
        return new Exp.CourseExp(code);
    }

    /**
     * parsePrereq parses either a course req (e.g COMP1100) a soft req (e.g 6 UNITS OF COMP COURSES) or
     * a hard req (e.g 6 UNITS OF 3000 LEVEL COMP COURSES). It returns an expression describing whether
     * the prerequisite has been met in the degree plan.
     * @return an Exp which can be evaluated to check if a course/soft/hard req is met.
     */
    private Exp parsePrereq() {

        Token current = tokenizer.current();

        //If the token is a course code, it must be a course requisite. Otherwise, its a soft/hard req.
        if (current.getType() == Token.Type.CODE) {
            return parseCourse();
        }

        if (current.getType() == Token.Type.INT) {

            //Get the number of units required.
            String units = current.getValue();
            tokenizer.next();

            //If the words UNITS or OF are missing throw an illegal parser exception.
            if (!tokenizer.current().getValue().equals("UNITS"))
                throw new IllegalParserException("Missing the word UNITS in the pre requisites");

            tokenizer.next();

            if (!tokenizer.current().getValue().equals("OF"))
                throw new IllegalParserException("Missing the word OF in the prerequisites");

            tokenizer.next();

            //If the next token is a COLLEGE token, it must be a soft req.
            if (tokenizer.current().getType() == Token.Type.COLLEGE)
                return parseSoftExp(units);

            //If the next token is an INT, it must be a hard req.
            if (tokenizer.current().getType() == Token.Type.INT)
                return parseHardExp(units);

            //Otherwise the string is formatted incorrectly.
            throw new IllegalParserException("Expected either a college or course-level, but was not there");
        }

        //If the token was not an int, then the string must be formatted incorrectly.
        throw new IllegalParserException("Expected an amount of units for a pre-requisite, but was not there.");
    }

    /**
     * parseSoftExp is used to parse a soft req. such as "6 UNITS OF COMP COURSES"
     * @param units The amount of units that must be completeed
     * @return a SoftExp describing whether the amount of units has been completed in the degree.
     */
    private Exp parseSoftExp(String units) {
        //Get the college that the courses must be completed from.
        String college = tokenizer.current().getValue();

        tokenizer.next();

        //String must include the word "COURSES" to be formatted correctly.
        if (!tokenizer.current().getValue().equals("COURSES")) {
            throw new IllegalParserException("Missing the word COURSES in the pre requisites");
        }

        tokenizer.next();

        return new Exp.SoftExp(college, units);
    }

    /**
     * parseHardExp is used to parse a hard req, such as "6 UNITS OF 3000 LEVEL COMP COURSES"
     * @param units The amount of units that must be completed.
     * @return an Exp describing whether the hard requirement has been met in the degree.
     */
    private Exp parseHardExp(String units) {
        //Get the level of courses that must be completed
        String level = tokenizer.current().getValue();

        tokenizer.next();

        //Throw an exception if the string is not formatted correctly.
        if (!tokenizer.current().getValue().equals("LEVEL"))
            throw new IllegalParserException("Missing the word LEVEL in the prerequisites");

        tokenizer.next();

        //Get the college which the courses must be completed from.
        String college = tokenizer.current().getValue();

        tokenizer.next();

        if(!tokenizer.current().getValue().equals("COURSES"))
            throw new IllegalParserException("Missing the word UNITS in the pre requisites");

        tokenizer.next();

        return new Exp.HardExp(units, level, college);
    }

}
