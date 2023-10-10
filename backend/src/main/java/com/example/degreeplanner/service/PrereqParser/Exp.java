package com.example.degreeplanner.service.PrereqParser;

import com.example.degreeplanner.model.Course;
import com.example.degreeplanner.model.Degree;

public abstract class Exp {
    /*
      Exp is an abstract class which is the parent of all the Exp classes. Exp are expressions used when parsing
      pre-reqsuites.
     */

    public abstract String toString();
    public abstract boolean evaluate(Degree degree, int semester);



    /**
     * the BracExp class is used for bracket expressions such as "(COMP1100 OR COMP1130) AND (COMP1110 OR COMP1140)
     */
    static class BracExp extends Exp {
        private final Exp exp;

        /**
         * Brac exp constructor
         * @param exp An expression to be evaluated inside the brackets.
         */
        public BracExp(Exp exp) {
            this.exp = exp;
        }

        public String toString() {
            return "(" + exp + ")";
        }

        @Override
        public boolean evaluate(Degree degree, int semester) {
            return exp.evaluate(degree, semester);
        }
    }

    /**
     * Or Expression used to evaluate a prerequisite such as "COMP1100 OR COMP1130"
     */
    static class OrExp extends Exp {
        private final Exp term;
        private final Exp exp;

        /**
         * Constructor for OrExp. Look at the parser template to find out what a term/exp is
         * @param term a term Exp that can be evaluated.
         * @param exp an Exp that can be evaluated.
         */
        public OrExp(Exp term, Exp exp) {
            this.term = term;
            this.exp = exp;
        }

        public String toString() {
            return this.term + " OR " + this.exp;
        }

        @Override
        public boolean evaluate(Degree degree, int semester) {
            return term.evaluate(degree, semester) || exp.evaluate(degree, semester);
        }

    }

    /**
     * And Expression used to evaluate prerequisites such as "COMP1100 AND COMP1110"
     */
    static class AndExp extends Exp {

        private final Exp factor;
        private final Exp term;

        /**
         * Constructor for AndExp. Look at parser template to find out what a factor/term is.
         * @param factor a factor expression that can be evaluated.
         * @param term a term expression that can be evaluated.
         */
        public AndExp(Exp factor, Exp term) {
            this.factor = factor;
            this.term = term;
        }

        public String toString() {
            return this.factor + " AND " + this.term;
        }

        @Override
        public boolean evaluate(Degree degree, int semester) {
            return factor.evaluate(degree, semester) && term.evaluate(degree, semester);
        }

    }

    /**
     * CourseExp is responsible for evaluating a single course. This just checks to see if the course is in the degree.
     */
    public static class CourseExp extends Exp {

        private final String code;

        /**
         * Constructor for CourseExp, takes a course code as input and checks to see if its in the plan.
         * @param code A String representing a course code.
         */
        public CourseExp(String code) {
            this.code = code;
        }

        public String toString() {
            return code;
        }


        @Override
        public boolean evaluate(Degree degree, int semester) {

            for (int sem = 0; sem < semester; sem++) {

                if (degree.getSemester(sem).stream().anyMatch(c -> c.getCode().equals(code))) {
                    return true;
                }
            }

            return false;
        }
    }

    /**
     * SoftExp class is used to evalute a soft pre requsite, this is something like "X UNITS OF YYYY COURSES".
     */
    public static class SoftExp extends Exp {

        private final int units;
        private final String college;

        /**
         * A constructor for a SoftExp class, takes a collega and a number of units and evaluates if that requirement has
         * been met.
         * @param college A string representing which college the units must be completed from.
         * @param units An int representing how many units must be completed.
         */
        public SoftExp(String college, String units) {
            this.college = college;
            this.units = Integer.parseInt(units);
        }

        public String toString() {
            return units + " UNITS OF " + college + " COURSES";
        }

        @Override
        public boolean evaluate(Degree degree, int semester) {
            int unitCount = 0;

            for (int sem = 0; sem < semester; sem++) {
                for (Course course: degree.getSemester(sem)) {
                    if (course.getSubject().equals(college))
                        unitCount += 6;
                }
            }
            return unitCount >= units;
        }

    }

    /**
     * HardExp is used to evaluate a hard expression such as "X UNITS OF Y000 LEVEL ZZZZ COURSES".
     */
    public static class HardExp extends Exp {

        private final int units;
        private final String college;
        private final int level;

        /**
         * Constructor for a HardExp, takes a college, a level and a number of units and evalutes whether or not
         * that requirement has been met by the current degree plan.
         * @param units A String representing how many units must be taken. e.g "6" for one course.
         * @param level A String representing what level the course(s) must be. E.g "2000" for 2nd year courses.
         * @param college A String representing which college the course(s) must belong to.
         */
        public HardExp(String units, String level, String college) {
            this.units = Integer.parseInt(units);
            this.level = Integer.parseInt(level);
            this.college = college;
        }

        public String toString() {
            return units + " UNITS OF " + level + " LEVEL " + college + " COURSES";
        }

        @Override
        public boolean evaluate(Degree degree, int semester) {
            int unitCount = 0;

            for (int sem = 0; sem < semester; sem++) {
                for (Course course: degree.getSemester(sem)) {
                    if (course.getSubject().equals(college) && course.getCatalogue() >= level)
                        unitCount += 6;
                }
            }
            return unitCount >= units;
        }

    }

    /**
     * NullExp used when a course has no prerequisites.
     */
    public static class NullExp extends Exp {

        public NullExp() {}

        public String toString() {
            return "";
        }

        @Override
        public boolean evaluate(Degree degree, int sem) {
            return true;
        }

    }

}
